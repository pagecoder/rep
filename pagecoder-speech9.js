document.addEventListener('DOMContentLoaded', (event) => {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        let queue = [];

        function setDutchVoice() {
            const voices = synth.getVoices();
            const dutchVoice = voices.find(voice => voice.lang === 'nl-NL');
            if (dutchVoice) {
                utterance.voice = dutchVoice;
                utterance.lang = 'nl-NL';
                console.log('Dutch voice set:', dutchVoice);
            } else {
                console.log('No Dutch voice available');
            }
        }

        setDutchVoice();
        synth.onvoiceschanged = setDutchVoice;

        function processQueue() {
            if (queue.length > 0 && !synth.speaking && !synth.pending) {
                const next = queue.shift();
                utterance.text = next;
                synth.speak(utterance);
            }
        }

        function handleButtonClick() {
            if (synth.paused) {
                synth.resume();
                this.classList.remove('paused');
                this.classList.add('speaking');
                this.querySelector('#pagecoder-speak-icon').className = 'fa fa-volume-up';
                this.querySelector('#pagecoder-speak-text').textContent = 'Spreken';
            } else if (synth.speaking) {
                synth.pause();
                this.classList.remove('speaking');
                this.classList.add('paused');
                this.querySelector('#pagecoder-speak-icon').className = 'fa fa-pause';
                this.querySelector('#pagecoder-speak-text').textContent = 'Gepauzeerd';
            } else {
                const textToSpeak = document.querySelector('.entry-content').textContent;
                queue.push(textToSpeak);
                processQueue();
                this.classList.add('speaking');
                this.querySelector('#pagecoder-speak-icon').className = 'fa fa-volume-up';
                this.querySelector('#pagecoder-speak-text').textContent = 'Spreken';
            }
        }

        utterance.onend = function() {
            const button = document.getElementById('pagecoder-speak-button');
            if (button) {
                button.classList.remove('speaking', 'paused');
                button.querySelector('#pagecoder-speak-icon').className = 'fa fa-volume-up';
                button.querySelector('#pagecoder-speak-text').textContent = 'Lees voor';
            }
        };

        utterance.onerror = function(event) {
            console.error('An error has occurred while speaking:', event);
            synth.cancel();
        };

        synth.cancel();




        const breadcrumbsInner = document.querySelector('.ast-breadcrumbs-inner');
        const placeholder = document.getElementById('pagecoder-speech-placeholder');

        if (breadcrumbsInner && placeholder) {
            const newButton = document.createElement('button');
            newButton.id = 'pagecoder-speak-button';
            newButton.innerHTML = '<i id="pagecoder-speak-icon" class="fa fa-volume-up"></i><span id="pagecoder-speak-text">Lees voor</span>';
            breadcrumbsInner.appendChild(newButton);
            newButton.addEventListener('click', handleButtonClick);
        } else {
            const button = document.getElementById('pagecoder-speak-button');
            if (button) {
                button.addEventListener('click', handleButtonClick);
            }
        }








    } else {
        alert('Web Speech API not supported');
    }
});
