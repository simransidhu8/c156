AFRAME.registerComponent("game-play", {
    schema: {
        elementId: {type:'string', default:'#ring1'}
    },

    init: function(){
        var duration=120
        var timerE1=document.querySelector('#Timer')
        this.startTimer(duration, timerE1)
    },

    startTimer: function(duration, timerE1){
        var minutes, seconds 

        setInterval(() => {
            if(duration >= 0){
                minutes= parseInt(duration/60)
                seconds = parseInt(duration%60)

                if(minutes<10){
                    minutes = "0" + minutes
                }

                if(seconds<10){
                    seconds="0" + seconds
                }

                timerE1.setAttribute('text', {value: minutes + ":" + seconds})

                duration -= 1
            }
        }, 1000);
    },

    updateTargets: function(){
        var element = document.querySelector("#targets")
        var count = element.getAttribute('text').value
        var currentTargets = parseInt(count)

        currentTargets -= 1

        element.setAttribute('text', {value: currentTargets})
    },

    updateScore:function(){
        var element = document.querySelector("#score")
        var count= element.getAttribute('text').value
        var currentScore = parseInt(count)

        currentScore += 50

        element.setAttribute('text', {value: currentScore})
    },

    gameOver:function(){
        var planeE1 = document.querySelector('#plane_model')
        var element = documenet.querySelector("#game_over_text")
        element.setAttribute("visible", true)
        planeE1.setAttribute("dynamic-body", {mass: 1})
    },

    isCollided: function(elementId){
        const element = document.querySelector(elementId)

        element.addEventListener('collide', e=>{
            if(elementId.includes("#ring")){
                element.setAttribute('visible', false)
                this.updateTargets()
                this.updateScore()
            }
            else(this.gameOver())
        })
    },

    update: function(){
        this.isCollided(this.data.elementId)
    }
})