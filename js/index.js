
const anss = document.querySelectorAll(".ans");
const labels = document.querySelectorAll(".ans + label");
const submit = document.querySelector(".submit");
const forms = document.querySelectorAll("form.answer");
const questions = document.querySelectorAll(".question");
let checked;

let choosenAnswers = [];

const answers = ['a','c','a','d','b'];


// ANSWER SELECTION
anss.forEach((ans)=>{
    ans.addEventListener("mouseup",()=>{
        checked=ans.checked?false:true;
        ans.checked=checked;
    });
    ans.addEventListener("change",()=>{
        ans.checked=checked;
    });
})
labels.forEach((label)=>{
    const ans =  label.previousElementSibling;

    label.addEventListener("click",()=>{
        checked=ans.checked?false:true;
        ans.checked=checked;
    });
})


// CORRECTION
submit.addEventListener("click",()=>{
    choosenAnswers=[];
    let score = 0;

    document.querySelectorAll(".correct").forEach(correct=>{
        correct.classList.remove("active");
    });
    document.querySelectorAll(".wrong").forEach(wrong=>{
        wrong.classList.remove("active");
    })


    questions.forEach((ques,index)=>{

        const num = ques.id.split('m')[1];
        
        const ans = ques.querySelector("input[name='ans']:checked")?ques.querySelector("input[name='ans']:checked").value:'z';

        choosenAnswers.push({
            num: Number(num),
            ans: ans
        })

        if(index == questions.length-1){
            // console.log(choosenAnswers);
            if(choosenAnswers.length>0){
                choosenAnswers.forEach(({num, ans}, Id)=>{
                    const correction = document.querySelector(`#num${num} .correction`);
                    const correct = correction.querySelector(".correct");
                    const wrong = correction.querySelector(".wrong");

                    const val = answers[num-1].toLocaleUpperCase();
                    const cans = ans.toLocaleUpperCase();

                    correction.classList.add("active");

                    if(val==cans){
                        score++;

                        correct.classList.add("active");
                        correction.querySelector(".value").textContent=`Good`;


                        console.log(`Answer number ${num} is correct (${cans})\n`);
                    }else{
                        wrong.classList.add("active");
                        correction.querySelector(".value").textContent=`${val} is the right answer`;

                        console.log(`Answer number ${num} is wrong. The correct answer is ${val}\n`);
                    }

                    if(Id == choosenAnswers.length-1){
                        const total = answers.length;

                        document.querySelector(".score").textContent = `${score}/${total}`

                    }
                })
            }
        }
    })
})