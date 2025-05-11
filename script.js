const questionContainer = document.getElementById('question-container');
const answerButtons = document.querySelectorAll('.answer-btn');
const fiftyFiftyButton = document.getElementById('fifty-fifty');
const audiencePollButton = document.getElementById('audience-poll');
const phoneAFriendButton = document.getElementById('phone-a-friend');
const feedbackJokerButton = document.getElementById('feedback-joker');
const scoreDisplay = document.getElementById('score');
const moneyLevelsContainer = document.querySelector('.money-levels');
const moneyLevels = document.querySelectorAll('.money-levels div');
const notificationBox = document.getElementById('notification-box');
const introBox = document.querySelector('.intro-box');
const gameArea = document.querySelector('.game-area');
const bottomBar = document.querySelector('.bottom-bar');

let currentQuestionIndex = 0;
let currentLevel = 1; // Başlangıç seviyesi
let questions = [
    {
        question: "Yoğun bir günün ardından zihnin düşüncelerle dolup taştığında, hangisi 'şimdiki ana odaklanma' becerisini destekler?",
        answers: [
            { text: "Tüm düşünceleri bastırmaya çalışmak.", correct: false, feedback: "" },
            { text: "Gelecekteki olası sorunları düşünmek.", correct: false, feedback: "" },
            { text: "Derin bir nefes alıp bedensel duyumlarına dikkat etmek.", correct: true, feedback: "Derin bir nefes almak ve bedensel duyumlara odaklanmak, zihni sakinleştirerek 'şimdiki ana odaklanma' becerisini geliştirir. Bu, psikolojik esnekliğin temelidir." },
            { text: "Sürekli olarak geçmişteki olayları analiz etmek.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Bir hata yaptığında ve kendini eleştiren düşünceler zihninde yankılandığında, hangisi 'kendine şefkat' pratiğine daha yakındır?",
        answers: [
            { text: "Kendini tamamen suçlamak ve cezalandırmak.", correct: false, feedback: "" },
            { text: "Hatayı görmezden gelmek ve umursamamak.", correct: false, feedback: "" },
            { text: "'Bu bir insanlık hali, herkes hata yapar' diyerek kendine anlayış göstermek.", correct: true, feedback: "'Bu bir insanlık hali, herkes hata yapar' düşüncesi, 'kendine şefkat' pratiğinin bir parçasıdır. Psikolojik esneklik, zorlayıcı duygularla nazikçe yaklaşabilmeyi içerir." },
            { text: "Başkalarını hatalarından dolayı eleştirmek.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Ulaşmak istediğin önemli bir hedefle ilgili engellerle karşılaştığında, 'değerlere bağlı eylem' ilkesini en iyi yansıtan davranış hangisidir?",
        answers: [
            { text: "Hedefi tamamen bırakmak çünkü çok zor görünüyor.", correct: false, feedback: "" },
            { text: "Engelleri yok sayıp aynı şekilde ilerlemeye çalışmak.", correct: false, feedback: "" },
            { text: "Hedefine ulaşmak için farklı yollar araştırmak ve denemek, değerlerinden ödün vermemek.", correct: true, feedback: "'Değerlere bağlı eylem', hedefe ulaşmada esnek olmayı ve değerlerimiz doğrultusunda hareket etmeyi içerir. Psikolojik esneklik, zorluklar karşısında yılmamayı gerektirir." },
            { text: "Suçu başkalarına atmak.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Kaygı verici bir durumla karşılaştığında, 'kabul' becerisini göstermek ne anlama gelir?",
        answers: [
            { text: "Kaygıyı tamamen ortadan kaldırmaya çalışmak.", correct: false, feedback: "" },
            { text: "Kaygıyı görmezden gelmek ve yokmuş gibi davranmak.", correct: false, feedback: "" },
            { text: "Kaygının varlığını fark etmek ve onunla savaşmak yerine o anki duruma odaklanmak.", correct: true, feedback: "'Kabul', zorlayıcı duyguların varlığını yadsımadan, onlarla savaşmak yerine o anki duruma odaklanabilmektir. Bu, psikolojik esnekliğin önemli bir yönüdür." },
            { text: "Kaygının geçmesini beklerken hiçbir şey yapmamak.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Gelecekle ilgili belirsizlikler seni endişelendirdiğinde, 'esnek düşünme' becerisi nasıl yardımcı olabilir?",
        answers: [
            { text: "Sadece en kötü senaryoyu düşünerek hazırlanmak.", correct: false, feedback: "" },
            { text: "Geleceği kesin olarak tahmin etmeye çalışmak.", correct: false, feedback: "" },
            { text: "Farklı olasılıkları göz önünde bulundurmak ve her duruma uyum sağlayabileceğine inanmak.", correct: true, feedback: "'Esnek düşünme', katı ve tek yönlü düşünceler yerine farklı olasılıkları değerlendirebilmeyi içerir. Psikolojik esneklik, belirsizlik karşısında uyum sağlayabilme kapasitesidir." },
            { text: "Hiçbir şey düşünmemeye çalışmak.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Olumsuz bir duygu hissettiğinde, hangisi bu duyguyla 'temasa geçme' ve onu anlamaya çalışma davranışını yansıtır?",
        answers: [
            { text: "Hemen dikkatini dağıtacak bir aktiviteye yönelmek.", correct: false, feedback: "" },
            { text: "Duyguyu bastırmaya çalışmak.", correct: false, feedback: "" },
            { text: "Durup bu duygunun ne olduğunu, bedeninde nasıl hissedildiğini fark etmek.", correct: true, feedback: "'Duygusal temasa geçme', hissettiğimiz duyguları fark etmek, adlandırmak ve onlarla yargılamadan kalabilmektir. Bu, psikolojik esnekliğin önemli bir parçasıdır." },
            { text: "Duygudan tamamen kaçınmak.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Başkalarının beklentileriyle kendi değerlerin çatıştığında, psikolojik olarak esnek biri nasıl bir yaklaşım sergiler?",
        answers: [
            { text: "Kendi değerlerinden ödün vererek herkesi memnun etmeye çalışır.", correct: false, feedback: "" },
            { text: "Başkalarının beklentilerini tamamen görmezden gelir.", correct: false, feedback: "" },
            { text: "Kendi değerlerini net bir şekilde ifade ederken, başkalarının görüşlerini de dikkate almaya çalışır.", correct: true, feedback: "Psikolojik olarak esnek olmak, kendi değerlerinin farkında olmayı ve bunları başkalarıyla dengeli bir şekilde ifade edebilmeyi içerir." },
            { text: "Çatışmadan kaçınmak için sessiz kalır.", correct: false, feedback: "" }
        ]
    },
    {
        question: "Zor bir kararla karşı karşıya kaldığında, 'perspektif alma' becerisi sana nasıl yardımcı olabilir?",
        answers: [
            { text: "Sadece kendi düşüncelerine odaklanmak.", correct: false, feedback: "" },
            { text: "Kararı tamamen başkalarının vermesini beklemek.", correct: false, feedback: "" },
            { text: "Durumu farklı açılardan ve olası sonuçlarıyla birlikte değerlendirmek.", correct: true, feedback: "'Perspektif alma', bir durumu farklı açılardan görebilmeyi ve olası sonuçlarını değerlendirebilmeyi içerir. Bu, daha bilinçli ve esnek kararlar almaya yardımcı olur." },
            { text: "En hızlı görünen kararı vermek.", correct: false, feedback: "" }
        ]
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    resetAnswerButtons();
    let currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    // Cevapları karıştır
    const shuffledAnswers = [...currentQuestion.answers];
    shuffleArray(shuffledAnswers);

    shuffledAnswers.forEach((answer, index) => {
        answerButtons[index].innerText = String.fromCharCode(65 + index) + ": " + answer.text;
        answerButtons[index].dataset.correct = answer.correct;
        answerButtons[index].dataset.feedback = answer.feedback;
        answerButtons[index].style.visibility = 'visible';
        answerButtons[index].removeEventListener('click', selectAnswer); // Önceki dinleyiciyi kaldır
        answerButtons[index].addEventListener('click', selectAnswer); // Yeni dinleyiciyi ekle
    });
}

function resetAnswerButtons() {
    answerButtons.forEach(button => {
        button.classList.remove('correct');
        button.classList.remove('wrong');
        button.disabled = false;
    });
}

function showNotification(message, type = 'normal') {
    notificationBox.innerText = message;
    notificationBox.className = 'notification show';
    if (type === 'correct') {
        notificationBox.classList.add('correct-feedback');
    } else if (type === 'joker') {
        notificationBox.classList.add('joker-feedback');
    }
    setTimeout(() => {
        notificationBox.classList.remove('show');
        notificationBox.classList.remove('correct-feedback');
        notificationBox.classList.remove('joker-feedback');
    }, 3000);
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    answerButtons.forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        selectedButton.classList.add('correct');
        const currentLevelDiv = moneyLevelsContainer.querySelector(`[data-level="${currentLevel}"]`);
        if (currentLevelDiv) {
            currentLevelDiv.classList.add('correct-answer');
            setTimeout(() => {
                currentLevelDiv.classList.remove('correct-answer');
                if (currentLevel < moneyLevels.length) {
                    currentLevel++;
                    updateMoneyLevels();
                    const currentAmount = parseInt(moneyLevelsContainer.querySelector(`[data-level="${currentLevel}"]`).dataset.amount);
                    scoreDisplay.innerText = `Kazanılan: ₺${formatCurrency(currentAmount)}`;
                    setTimeout(nextQuestion, 1000);
                } else {
                    endQuiz();
                }
            }, 1000);
        }
    } else {
        selectedButton.classList.add('wrong');
        answerButtons.forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
        setTimeout(() => {
            window.location.href = 'https://betul1526.github.io/sohbetarkadas-n-z/';
        }, 1500);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionContainer.innerText = `Oyun Bitti! Kazandığınız Tutar: ${scoreDisplay.innerText}`;
    resetAnswerButtons();
    currentLevel = 1;
    updateMoneyLevels();
    // İstersen burada yönlendirme yapabilirsin
}

function updateMoneyLevels() {
    moneyLevels.forEach(levelDiv => {
        levelDiv.classList.remove('active');
    });
    const activeLevelDiv = moneyLevelsContainer.querySelector(`[data-level="${currentLevel}"]`);
    if (activeLevelDiv) {
        activeLevelDiv.classList.add('active');
    }
}

function useFiftyFiftyJoker() {
    if (fiftyFiftyButton.disabled) return;
    fiftyFiftyButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);
    let incorrectIndices = [];
    currentQuestion.answers.forEach((answer, index) => {
        if (!answer.correct) {
            incorrectIndices.push(index);
        }
    });

    let removedCount = 0;
    let indicesToRemove = [];
    while (removedCount < 2 && incorrectIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * incorrectIndices.length);
        const removedIndex = incorrectIndices[randomIndex];
        indicesToRemove.push(removedIndex);
        incorrectIndices.splice(randomIndex, 1);
        removedCount++;
    }

    answerButtons.forEach((button, index) => {
        const buttonLetter = button.innerText.split(':')[0].trim();
        const answerIndex = buttonLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        if (indicesToRemove.includes(answerIndex)) {
            button.style.visibility = 'hidden';
        }
    });
    showNotification("İki yanlış cevap silindi.", 'joker');
}

function useAudiencePollJoker() {
    if (audiencePollButton.disabled) return;
    audiencePollButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);
    const pollResults = [Math.floor(Math.random() * 30) + 30, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 15) + 5, Math.floor(Math.random() * 35) + 25];
    const correctBoost = Math.floor(Math.random() * 20) + 10;
    pollResults[correctIndex] += correctBoost;
    const total = pollResults.reduce((sum, val) => sum + val, 0);
    const normalizedResults = pollResults.map(result => Math.round((result / total) * 100));
    showNotification(`Seyirci Tahminleri:\n A: %${normalizedResults[0]} \n B: %${normalizedResults[1]} \n C: %${normalizedResults[2]} \n D: %${normalizedResults[3]}`, 'joker');
}

function usePhoneAFriendJoker() {
    if (phoneAFriendButton.disabled) return;
    phoneAFriendButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);
    const friendsAdvice = ["Bence cevap kesinlikle ", "Sanırım doğru cevap ", "Büyük ihtimalle ", "Belki de "];
    const randomIndex = Math.floor(Math.random() * friendsAdvice.length);
    const advice = friendsAdvice[randomIndex] + String.fromCharCode(65 + correctIndex);
    showNotification(`Arkadaşın diyor ki: "${advice}"`, 'joker');
}

function useFeedbackJoker() {
    if (feedbackJokerButton.disabled) return;
    feedbackJokerButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);
    showNotification(`Doğru Cevap: ${String.fromCharCode(65 + correctIndex)}\n\n${currentQuestion.answers[correctIndex].feedback}`, 'correct');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
}

// Sayfa yüklendiğinde ilk soruyu göster ve soruları karıştır
shuffleArray(questions);
showQuestion();
updateMoneyLevels();
scoreDisplay.innerText = `Kazanılan: ₺${formatCurrency(0)}`;

fiftyFiftyButton.addEventListener('click', useFiftyFiftyJoker);
audiencePollButton.addEventListener('click', useAudiencePollJoker);
phoneAFriendButton.addEventListener('click', usePhoneAFriendJoker);
feedbackJokerButton.addEventListener('click', useFeedbackJoker);