let questions = [
    {
        question: "Digərlərindən fərqlənən adı seçin.",
        options: ["Cəlil Məmmədquluzadə", "Səməd bəy Mehmandarov", "Həzi Aslanov", "Cəmşid Naxçıvanski"],
        correctAnswer: 2
    },
    {
        question: "Asif işdən saat 6-da çıxaraq evə doğru  velosipedlə yola düşdü. Velosipedin orta sürəti saniyədə 3 metr  olmaqla Asifin 1 saatdan sonra evə çatdığını nəzərə alaraq işdən evə qədər olan yolun təxmini uzunluğunu seçin.?",
        options: ["18 km", "3 km", "11 km", "6 km"],
        correctAnswer: 2
    },

    {
        question: "13 - üo, 45 - bq, 39 - ??",
        options: ["od", "do", " ao", "hec biri"],
        correctAnswer: 0
    },

    {
        question: "Şəhər -> kitabxana -> kitab -> ?",
        options: ["oxucu", "dəftər", "vərəq", "nəşriyyat"],
        correctAnswer: 2
    },

    {
        question: "Əgər dünən yox, daha əvvəlki gün yox, daha əvvəlki gün çərşənbə idisə, sabah yox biri gün hansı gün olar???",
        options: ["Şənbə", "Bazar ertəsi", "Çərşənbə", "Çərşənbə axşamı" ," bazar"],
        correctAnswer: 4
    }

];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    let options = document.querySelectorAll('.option');
    options.forEach((button, index) => {
        button.innerText = question.options[index];
    });
}

function submitAnswer(answerIndex) {
    let correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (answerIndex === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    
    // Backend'e skoru gönderip sıralama bilgisi almak
    fetch('/submit_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('rank').innerText = data.rank;
    });
}

loadQuestion();


