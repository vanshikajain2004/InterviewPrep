// Interview Session Class with AI Questions
class InterviewSession {
    constructor() {
        console.log('Initializing interview session with AI...');
        
        // Get role from localStorage
        this.role = localStorage.getItem('selectedRole') || 'Frontend Developer';
        this.difficulty = localStorage.getItem('selectedDifficulty') || 'intermediate';
        
        console.log('Role:', this.role);
        console.log('Difficulty:', this.difficulty);
        
        // Initialize variables
        this.recognition = null;
        this.isRecording = false;
        this.recordingTime = 0;
        this.timerInterval = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.answers = [];
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.interviewStartTime = new Date();
        this.currentQuestionStartTime = null;
        this.isLoading = true;
        
        // Check authentication
        this.checkAuth();
        
        // Show loading state
        this.showLoading();
        
        // Load questions from AI
        this.loadAIQuestions();
        
        // Setup UI
        this.updateRoleTitle();
        this.setupEventListeners();
        
        // Initialize speech recognition
        this.initSpeechRecognition();
    }
    
    showLoading() {
        document.getElementById('questionText').innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading-spinner"></div>
                <p style="margin-top: 1rem; color: rgba(255,255,255,0.7);">
                    AI is generating questions for ${this.role}...
                </p>
            </div>
        `;
    }
    
    async loadAIQuestions() {
        try {
            // Try to get AI-generated questions from backend
            const response = await fetch(`${API_URL}/interviews/generate-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    role: this.role,
                    difficulty: this.difficulty,
                    count: 5
                })
            });
            
            const data = await response.json();
            
            if (data.success && data.questions) {
                this.questions = data.questions;
                console.log('AI Generated Questions:', this.questions);
            } else {
                // Fallback to predefined questions
                console.log('Using fallback questions');
                this.questions = this.getFallbackQuestions();
            }
        } catch (error) {
            console.error('Error loading AI questions:', error);
            // Fallback to predefined questions
            this.questions = this.getFallbackQuestions();
        }
        
        this.isLoading = false;
        this.displayCurrentQuestion();
        document.getElementById('totalQuestions').textContent = this.questions.length;
    }
    
    getFallbackQuestions() {
        // Fallback questions in case AI fails
        const fallbackBank = {
            'Frontend Developer': [
                { question: "Explain the difference between let, const, and var in JavaScript.", category: "technical" },
                { question: "How does the virtual DOM work in React?", category: "technical" },
                { question: "Describe your approach to responsive web design.", category: "technical" },
                { question: "Tell me about a challenging project you worked on.", category: "behavioral" },
                { question: "How do you stay updated with frontend technologies?", category: "behavioral" }
            ],
            'Backend Developer': [
                { question: "Explain RESTful API design principles.", category: "technical" },
                { question: "How do you handle database optimization?", category: "technical" },
                { question: "What security measures do you implement?", category: "technical" },
                { question: "Describe a complex system you built.", category: "behavioral" },
                { question: "How do you handle technical debt?", category: "behavioral" }
            ]
        };
        
        return fallbackBank[this.role] || fallbackBank['Frontend Developer'];
    }
    
    async submitAnswer() {
        const answer = document.getElementById('answerInput').value.trim();
        
        if (!answer) {
            this.showTip('Please provide an answer before submitting');
            return;
        }
        
        // Show analyzing state
        this.showAnalyzing();
        
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        try {
            // Get AI feedback on the answer
            const feedbackResponse = await fetch(`${API_URL}/interviews/analyze-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    question: currentQuestion.question,
                    answer: answer,
                    expectedKeywords: currentQuestion.expectedKeywords || []
                })
            });
            
            const feedbackData = await feedbackResponse.json();
            const feedback = feedbackData.feedback || { score: 75 };
            
            // Save answer with AI feedback
            this.answers.push({
                question: currentQuestion.question,
                answer: answer,
                score: feedback.score,
                feedback: feedback,
                timestamp: new Date().toISOString()
            });
            
            // Show feedback
            this.showFeedback(feedback);
            
            // Generate follow-up questions (optional)
            this.generateFollowUps(currentQuestion.question, answer);
            
        } catch (error) {
            console.error('Error getting feedback:', error);
            
            // Simple scoring if AI fails
            const wordCount = answer.split(' ').length;
            let score = 60;
            if (wordCount > 30) score += 10;
            if (wordCount > 50) score += 10;
            if (answer.toLowerCase().includes('example')) score += 10;
            
            this.answers.push({
                question: currentQuestion.question,
                answer: answer,
                score: Math.min(100, score),
                timestamp: new Date().toISOString()
            });
        }
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex < this.questions.length) {
                // Next question
                document.getElementById('answerInput').value = '';
                document.getElementById('transcriptBox').style.display = 'none';
                this.displayCurrentQuestion();
                this.resetMetrics();
            } else {
                // Interview complete
                this.completeInterview();
            }
        }, 3000);
    }
    
    showAnalyzing() {
        const submitBtn = document.getElementById('submitAnswer');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Analyzing...';
    }
    
    showFeedback(feedback) {
        const tipsList = document.getElementById('feedbackTips');
        tipsList.innerHTML = `
            <li style="color: #4a6cf7; font-weight: bold;">Score: ${feedback.score}%</li>
            ${feedback.strengths ? feedback.strengths.map(s => `<li>✅ ${s}</li>`).join('') : ''}
            ${feedback.improvements ? feedback.improvements.map(i => `<li>📝 ${i}</li>`).join('') : ''}
            <li style="margin-top: 10px;">💡 ${feedback.suggestions || 'Good attempt!'}</li>
        `;
    }
    
    async generateFollowUps(question, answer) {
        try {
            const response = await fetch(`${API_URL}/interviews/generate-followup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    question: question,
                    answer: answer,
                    role: this.role
                })
            });
            
            const data = await response.json();
            
            if (data.followUps && data.followUps.length > 0) {
                console.log('Follow-up questions:', data.followUps);
                // You can display these in the UI if needed
            }
        } catch (error) {
            console.error('Error generating follow-ups:', error);
        }
    }
    
    displayCurrentQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const questionObj = this.questions[this.currentQuestionIndex];
            const questionText = typeof questionObj === 'string' ? questionObj : questionObj.question;
            
            document.getElementById('questionText').textContent = questionText;
            document.getElementById('currentQuestionNum').textContent = this.currentQuestionIndex + 1;
            
            // Show category if available
            if (questionObj.category) {
                const categoryBadge = document.createElement('span');
                categoryBadge.className = 'category-badge';
                categoryBadge.textContent = questionObj.category;
                // Add to UI if you want
            }
            
            this.currentQuestionStartTime = null;
            this.finalTranscript = '';
            
            // Re-enable submit button
            document.getElementById('submitAnswer').disabled = false;
            document.getElementById('submitAnswer').textContent = 'Submit Answer';
        }
    }
    
    // ... rest of your existing methods (initSpeechRecognition, startRecording, stopRecording, etc.)
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, starting AI-powered interview...');
    window.interview = new InterviewSession();
});



// Interview Session Class with AI Questions
class InterviewSession {
    constructor() {
        console.log('Initializing interview session with AI...');
        
        // Get role from localStorage
        this.role = localStorage.getItem('selectedRole') || 'Frontend Developer';
        this.difficulty = localStorage.getItem('selectedDifficulty') || 'intermediate';
        
        console.log('Role:', this.role);
        console.log('Difficulty:', this.difficulty);
        
        // Initialize variables
        this.recognition = null;
        this.isRecording = false;
        this.recordingTime = 0;
        this.timerInterval = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.answers = [];
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.interviewStartTime = new Date();
        this.currentQuestionStartTime = null;
        this.isLoading = true;
        
        // Check authentication
        this.checkAuth();
        
        // Show loading state
        this.showLoading();
        
        // Load questions from AI
        this.loadAIQuestions();
        
        // Setup UI
        this.updateRoleTitle();
        this.setupEventListeners();
        
        // Initialize speech recognition
        this.initSpeechRecognition();
    }
    
    showLoading() {
        document.getElementById('questionText').innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading-spinner"></div>
                <p style="margin-top: 1rem; color: rgba(255,255,255,0.7);">
                    AI is generating questions for ${this.role}...
                </p>
            </div>
        `;
    }
    
    async loadAIQuestions() {
        try {
            // Try to get AI-generated questions from backend
            const response = await fetch(`${API_URL}/interviews/generate-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    role: this.role,
                    difficulty: this.difficulty,
                    count: 5
                })
            });
            
            const data = await response.json();
            
            if (data.success && data.questions) {
                this.questions = data.questions;
                console.log('AI Generated Questions:', this.questions);
            } else {
                // Fallback to predefined questions
                console.log('Using fallback questions');
                this.questions = this.getFallbackQuestions();
            }
        } catch (error) {
            console.error('Error loading AI questions:', error);
            // Fallback to predefined questions
            this.questions = this.getFallbackQuestions();
        }
        
        this.isLoading = false;
        this.displayCurrentQuestion();
        document.getElementById('totalQuestions').textContent = this.questions.length;
    }
    
    getFallbackQuestions() {
        // Fallback questions in case AI fails
        const fallbackBank = {
            'Frontend Developer': [
                { question: "Explain the difference between let, const, and var in JavaScript.", category: "technical" },
                { question: "How does the virtual DOM work in React?", category: "technical" },
                { question: "Describe your approach to responsive web design.", category: "technical" },
                { question: "Tell me about a challenging project you worked on.", category: "behavioral" },
                { question: "How do you stay updated with frontend technologies?", category: "behavioral" }
            ],
            'Backend Developer': [
                { question: "Explain RESTful API design principles.", category: "technical" },
                { question: "How do you handle database optimization?", category: "technical" },
                { question: "What security measures do you implement?", category: "technical" },
                { question: "Describe a complex system you built.", category: "behavioral" },
                { question: "How do you handle technical debt?", category: "behavioral" }
            ]
        };
        
        return fallbackBank[this.role] || fallbackBank['Frontend Developer'];
    }
    
    async submitAnswer() {
        const answer = document.getElementById('answerInput').value.trim();
        
        if (!answer) {
            this.showTip('Please provide an answer before submitting');
            return;
        }
        
        // Show analyzing state
        this.showAnalyzing();
        
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        try {
            // Get AI feedback on the answer
            const feedbackResponse = await fetch(`${API_URL}/interviews/analyze-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    question: currentQuestion.question,
                    answer: answer,
                    expectedKeywords: currentQuestion.expectedKeywords || []
                })
            });
            
            const feedbackData = await feedbackResponse.json();
            const feedback = feedbackData.feedback || { score: 75 };
            
            // Save answer with AI feedback
            this.answers.push({
                question: currentQuestion.question,
                answer: answer,
                score: feedback.score,
                feedback: feedback,
                timestamp: new Date().toISOString()
            });
            
            // Show feedback
            this.showFeedback(feedback);
            
            // Generate follow-up questions (optional)
            this.generateFollowUps(currentQuestion.question, answer);
            
        } catch (error) {
            console.error('Error getting feedback:', error);
            
            // Simple scoring if AI fails
            const wordCount = answer.split(' ').length;
            let score = 60;
            if (wordCount > 30) score += 10;
            if (wordCount > 50) score += 10;
            if (answer.toLowerCase().includes('example')) score += 10;
            
            this.answers.push({
                question: currentQuestion.question,
                answer: answer,
                score: Math.min(100, score),
                timestamp: new Date().toISOString()
            });
        }
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex < this.questions.length) {
                // Next question
                document.getElementById('answerInput').value = '';
                document.getElementById('transcriptBox').style.display = 'none';
                this.displayCurrentQuestion();
                this.resetMetrics();
            } else {
                // Interview complete
                this.completeInterview();
            }
        }, 3000);
    }
    
    showAnalyzing() {
        const submitBtn = document.getElementById('submitAnswer');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Analyzing...';
    }
    
    showFeedback(feedback) {
        const tipsList = document.getElementById('feedbackTips');
        tipsList.innerHTML = `
            <li style="color: #4a6cf7; font-weight: bold;">Score: ${feedback.score}%</li>
            ${feedback.strengths ? feedback.strengths.map(s => `<li>✅ ${s}</li>`).join('') : ''}
            ${feedback.improvements ? feedback.improvements.map(i => `<li>📝 ${i}</li>`).join('') : ''}
            <li style="margin-top: 10px;">💡 ${feedback.suggestions || 'Good attempt!'}</li>
        `;
    }
    
    async generateFollowUps(question, answer) {
        try {
            const response = await fetch(`${API_URL}/interviews/generate-followup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    question: question,
                    answer: answer,
                    role: this.role
                })
            });
            
            const data = await response.json();
            
            if (data.followUps && data.followUps.length > 0) {
                console.log('Follow-up questions:', data.followUps);
                // You can display these in the UI if needed
            }
        } catch (error) {
            console.error('Error generating follow-ups:', error);
        }
    }
    
    displayCurrentQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const questionObj = this.questions[this.currentQuestionIndex];
            const questionText = typeof questionObj === 'string' ? questionObj : questionObj.question;
            
            document.getElementById('questionText').textContent = questionText;
            document.getElementById('currentQuestionNum').textContent = this.currentQuestionIndex + 1;
            
            // Show category if available
            if (questionObj.category) {
                const categoryBadge = document.createElement('span');
                categoryBadge.className = 'category-badge';
                categoryBadge.textContent = questionObj.category;
                // Add to UI if you want
            }
            
            this.currentQuestionStartTime = null;
            this.finalTranscript = '';
            
            // Re-enable submit button
            document.getElementById('submitAnswer').disabled = false;
            document.getElementById('submitAnswer').textContent = 'Submit Answer';
        }
    }
    
    // ... rest of your existing methods (initSpeechRecognition, startRecording, stopRecording, etc.)
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, starting AI-powered interview...');
    window.interview = new InterviewSession();
});