function navigate(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + screenId);
    if(target) {
        target.classList.add('active');
        const content = target.querySelector('.app-content');
        if (content) content.scrollTo(0, 0);
    }
}

// Atualizar a data e hora na tela da CNH
const el = document.getElementById('current-datetime');
if(el) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    el.innerText = `Atualizado em ${dateStr} - ${timeStr}`;
}

// Lógica para atrelar o scroll do slider de CNH aos pontinhos
const slider = document.getElementById('cnh-slider');
const dots = document.querySelectorAll('#cnh-dots .dot');

if(slider && dots.length > 0) {
    slider.addEventListener('scroll', () => {
        // Encontrar o indice do slide atual puramente através da % de rolagem
        const scrollPercentage = slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
        // Arredondar baseando na quantia de slides (0 = primeira, 0.5 = segunda, 1.0 = terceira)
        let index = Math.round(scrollPercentage * (dots.length - 1));
        
        if(isNaN(index)) index = 0;

        dots.forEach((dot, i) => {
            if(i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    });
}

// Toast Functionality
let toastTimeout;
function showToast(message, isSuccess = false) {
    const toast = document.getElementById("toast");
    if(!toast) return;
    
    toast.innerText = message;
    
    if (isSuccess) {
        toast.classList.add("success");
    } else {
        toast.classList.remove("success");
    }
    
    toast.classList.add("show");
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function copyQR() {
    showToast('QR Code copiado para a área de transferência!', true);
}
