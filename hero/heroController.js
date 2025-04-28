import { heroDisplay } from "./heroView.js"

export function heroController() {
    const hero = document.querySelector('.hero')    
    hero.innerHTML = heroDisplay();
    
    const heroChildren = Array.from(hero.children)
    const resetStyles = () => {
        heroChildren.forEach(item => {
            item.classList.add('transitionFlexGrowSlow');
            item.classList.remove('transitionFlexFast');
            item.classList.remove('expand');
        })
    }


    let currentIndex = 1;
    let animationID;
    let isAnimating = true;
    const firstElement = heroChildren[0];
    firstElement.classList.add('expand');

    heroChildren.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            isAnimating = false;
            resetStyles();            
            e.target.classList.remove('transitionFlexGrowSlow');
            e.target.classList.add('transitionFlexFast');
            e.target.classList.add('expand');
        });
        el.addEventListener('mouseleave', (e) => {
            isAnimating = true;
            resetStyles();
            const targetIndex = heroChildren.findIndex(node => node === e.target)
            currentIndex = targetIndex + 1;
            if (currentIndex >= 3) currentIndex = 0;
            e.target.classList.add('expand');
            setTimeout(() => {
                animate();
            }, 1000)
        });
    })
    function animate() {
        if (!isAnimating) return;
        setTimeout(() => {

            resetStyles();
            // console.log(currentIndex,'index');
            const elementSelected = heroChildren[currentIndex];
            // void elementSelected.offsetHeight; 
            elementSelected.classList.add('expand');
            elementSelected.addEventListener('transitionend', function handler(e) {
                // console.log('terminando transicion');
                elementSelected.removeEventListener('transitionend', handler);
                if (!isAnimating) return;
                currentIndex++;
                if (currentIndex === heroChildren.length) {
                    currentIndex = 0
                }
                animationID = requestAnimationFrame(animate)

            })
        }, 5000)
    }

    animate();
}