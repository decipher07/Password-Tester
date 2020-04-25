console.log('Client Side JavaScript Loaded');
const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)

updateStrengthMeter();

function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength(passwordInput.value);
    console.log(weaknesses)
    
    let strength = 100 ;
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
        if (weakness == null) return 
        strength -= weakness.deduction;
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message;
        reasonsContainer.appendChild(messageElement);
    })
    strengthMeter.style.setProperty('--strength', strength);
}

function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialWeakness(password))
    weaknesses.push(repeatCharacterWeakness(password))
    return weaknesses
}

function lengthWeakness(password) {
    const length = password.length;
    if (length <= 5){
        return {
            message: 'Your Password is too Short',
            deduction: 40
        }
    }

    if (length <= 10){
        return {
            message: 'Your Password Could Be Larger',
            deduction: 15 
        }
    }
}

function lowercaseWeakness(password){
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase')
}

function uppercaseWeakness(password){
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase' )
}

function numberWeakness(password){
    return characterTypeWeakness(password,/[0-9]/g, 'numbers')
}


function specialWeakness(password){
    return characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g, 'Special')
}

function characterTypeWeakness(password, regex, type){
    const matches = password.match(regex) || [] 

    if (matches.length === 0){
        return {
            message: `Your Password has no ${type} Character`,
            deduction: 20  
        }
    }


    if (matches.length <= 2){
        return {
            message: `Your Password can have more ${type} Character`,
            deduction: 5 
        }
    }   
}

function repeatCharacterWeakness(password){
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0){
        return {
            message: 'Your Password has Repeat Characters',
            deduction: matches.length*1.55
        }
    }
}