// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
// Finish location section
import 'bootstrap'
import { places } from './destinations'
import { shoes } from './shoes'

// Location ----------------------------------------------------------------------------------------

if (document.querySelector("#location")) {
    for (let p of places) {
        let dest = document.getElementById('D' + p.id)
        dest.innerHTML += `
        <div class="card px-0 shadow-sm">
        <img src="${p.img}" class="card-img-top rounded" alt="${p.alt}">
        </div>
        `

        dest.onclick = function() {
            document.querySelector("#location").insertAdjacentHTML("afterend", `<div id="popup" style="background-color: rgb(70, 70, 70); width: 100%; height: 100vh; position: absolute; top: 0; left: 0; font-family: var(--bs-body-font-family);" class="d-flex flex-column align-items-center">
            <button type="button" class="btn-close btn-close-white ms-auto me-3 mt-3" aria-label="Close"></button>
                <div class="card px-0 shadow-sm w-50 mx-auto" style="max-height: 500px;">
                <img src="${p.img}" alt="${p.alt}" style="object-fit: cover; max-height: 200px;">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p style="font-size: 0.8rem;">${p.description}</p>
                    <a href="${p.address}" target="_blank" class="btn btn-warning btn-md">Let's Go!</a>
                </div>
                </div>
            </div>
            `)
            document.querySelector("nav").classList.add('d-none')
            document.querySelector(".container").classList.add('d-none')
            document.querySelector("footer").classList.add('d-none')
            document.querySelector(".btn-close").onclick = function() {
                document.querySelector("#popup").classList.add('d-none')
                document.querySelector("nav").classList.remove('d-none')
                document.querySelector(".container").classList.remove('d-none')
                document.querySelector("footer").classList.remove('d-none')
            }
        }
    }
}




// ---------------------------------------------------------------------------------------------------
// Shoes ---------------------------------------------------------------------------------------------

if (document.querySelector("#shoe")) {
    let store = document.querySelector("#shoes")

    for (let s of shoes) {
        store.innerHTML += `
        <div class="col">
        <div class="card px-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${s.title}</h5>
                <p>"${s.description}"</p>
                <a href="${s.address}" class="btn btn-warning" target="_blank">View Locations</a>
            </div>
        </div>
        </div>
        `
    }
}



// ---------------------------------------------------------------------------------------------------
// BMI ----------------------------------------------------------------------------------------------

if (document.querySelector("#bmi")) {
    function calculateBMI(event) {
        event.preventDefault()
        const feet = document.querySelector("#feet").value
        const extra = document.querySelector("#inches").value
        const inches = (feet * 12) + (extra * 1)
        const pounds = document.querySelector("#lbs").value

        let bmi = (703 * pounds) / (inches * inches)
        bmi = Math.round(bmi * 10) / 10
        let analysis = ""

        if (bmi < 18.5) {
            analysis = "you are underweight"
        }
        else if (bmi >= 18.5 && bmi < 25) {
            analysis = "your weight is normal"
        }
        else if (bmi >= 25 && bmi < 30) {
            analysis = "you are overweight"
        }
        else {
            analysis = "you are obese"
        }

        if (!document.querySelector("#bmiResult")) {
            document.querySelector("#bmiform").innerHTML += `<p class="fw-bold mt-4" id="bmiResult">Your BMI is ${bmi}</p>`
            document.querySelector("#analysis").innerHTML += `<p class="mt-5 fw-bold" id="bmiAnalysis">According to your BMI of ${bmi}, ${analysis}</p>`
        }
        else {
            document.querySelector("#bmiResult").textContent = `Your BMI is ${bmi}`
            document.querySelector("#bmiAnalysis").textContent = `According to your BMI of ${bmi}, ${analysis}`
        }

        document.querySelector("#bmiform").reset()

    }

    document.querySelector("#bmiform").onsubmit = calculateBMI
}

//---------------------------------------------------------------------------------------------------------
// Inspiration --------------------------------------------------------------------------------------------

if (document.querySelector("#inspiration")) {
    let tips = [
        {
            title: "Starting Out...",
            author: "Avrey Low",
            body: "The most important thing to remember when you are starting to run is not to run too far too fast. You have to give yourself time to adjust to running and if you do too much too soon, then you are going to injure yourself."
        },
        {
            title: "Your Running Mindset",
            author: "Avrey Low",
            body: "Something that I watch when I am running is what I am telling myself...am I telling myself I am too slow? That there's no way I can go one more step? Although it may seem strange, running is more than just a physical sport...there is a mental aspect to it. If you tell yourself that you can't do it, you're not going to be able to do it, even if you have the physical ability to do so. Of course, there are still limitations with the physical aspect, but if you don't believe in yourself then you will not perform as well as you could if you believe in your abilities."
        },
        {
            title: "Running Gear",
            author: "Avrey Low",
            body: "To prevent injuries, it is very important that your running shoes are in good condition. A general rule is that you buy new running shoes when you have ran at most 500 miles in your old shoes. You may even buy new ones sooner than that if you feel that they are becoming uncomfortable."
        }
    ]

    function hideForm() {
        document.querySelector('#insForm').classList.add('d-none')
        document.querySelector('#tips').classList.remove('d-none')
    }

    function showForm() {
        document.querySelector('#insForm').classList.remove('d-none')
    }

    function hideTips() {
        document.querySelector('#insForm').classList.remove('d-none')
        document.querySelector('#tips').classList.add('d-none')
    }

    function getTips() {
        if (localStorage.getItem('tips') && localStorage.getItem('tips') != '[]') {
            return JSON.parse(localStorage.getItem('tips'))
        }
        else {
            return tips
        }
    }

    function addPost(event) {
        event.preventDefault()

        let t = document.querySelector('#title').value
        let a = document.querySelector('#author').value
        let b = document.querySelector('#tip').value

        let posts = getTips()
        if (t && a && b) {
            let post = { title: t, author: a, body: b }
            posts.push(post)
            localStorage.setItem('tips', JSON.stringify(posts))
        }

        this.reset()
        if (window.innerWidth < 992) {
            hideForm()
        }
        displayPosts()
    }

    function displayPosts() {
        let posts = getTips()
        let posts_html = ''

        for (let p of posts) {
            posts_html += `
            <div class="col border rounded shadow-sm p-3 mb-5">
                <h3>${p.title}</h3>
                <p class="text-secondary">${p.author}</p>
                <p>${p.body}</p>
            </div>
            `
        }

        document.querySelector('#tips').innerHTML = posts_html

        function resizer() {
            if (window.innerWidth < 992) {
                hideForm()
                document.querySelector('.cancel').onclick = hideForm
            }
            else {
                showForm()
            }
        }
        window.addEventListener("resize", resizer)
        window.addEventListener("load", resizer)
    }

    document.querySelector('#insForm').onsubmit = addPost
    document.querySelector('#create_post').onclick = hideTips


    displayPosts()
}

// --------------------------------------------------------------------------------------------------------