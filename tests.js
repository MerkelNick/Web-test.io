async function submitTest(testType) {
    let correctAnswers = {
        html: { q1: "h1", q2: "alt", q3: "ul", q4: "action", q5: "video" },
        css: { q1: "p {}", q2: "padding", q3: "px", q4: "background-color: red;", q5: ":hover" },
        js: { q1: "let x = 10", q2: "===", q3: "alert()", q4: "myFunction();", q5: "document.getElementById('id')"}
    };

    let form = document.getElementById(testType + "Test");
    let answers = correctAnswers[testType];
    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let key in answers) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
            score++;
        }
    }
    function getTestDisplayName(testType) {
        const names = {
            html: "HTML",
            css: "CSS",
            js: "JavaScript"
        };
        return names[testType] || testType;
    }
    // Сохраняем результат в localStorage
    let testResult = {
        testName: getTestDisplayName(testType),
        score: score,
        totalQuestions: totalQuestions
    };
    localStorage.setItem('testResult', JSON.stringify(testResult));

    // Отправляем результат на сервер
    let username = localStorage.getItem("user");
    try {
        await fetch("http://localhost:3000/save-test-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username, 
                testName: testType.toUpperCase(), 
                score
            })
        });
        
    } catch (error) {
        console.error("Ошибка при сохранении результата:", error);
    }

    // Переходим на страницу результатов
    window.location.href = "result.html";
}
/*async function submitTest(testType) {
    let correctAnswers = {
        html: { q1: "h1", q2: "alt", q3: "ul", q4: "action", q5: "video" },
        css: { q1: "p {}", q2: "padding", q3: "px", q4: "background-color: red;", q5: ":hover" },
        js: { q1: "let x = 10", q2: "===", q3: "alert()", q4: "myFunction();", q5: "document.getElementById('id')"}
    };

    let form = document.getElementById(testType + "Test");
    let answers = correctAnswers[testType];
    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let key in answers) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
            score++;
        }
    }

// Отправляем результат на сервер
let username = localStorage.getItem("user"); 
let testName = testType.toUpperCase(); 

await fetch("http://localhost:3000/save-test-result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, testName, score })
});

}
*/