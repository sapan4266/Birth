
// ==========================================
// 1. SMALL INTERACTIONS - MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}


// ==========================================
// 2. PHOTO GALLERY LIGHTBOX
// ==========================================

const lightbox = document.getElementById('lightbox');

if (lightbox) {

    const lightboxImage = lightbox.querySelector('img');

    document.querySelectorAll('.photo-grid img').forEach(photo => {

        photo.addEventListener('click', () => {
            lightboxImage.src = photo.src;
            lightbox.classList.add('show');
        });

    });

    lightbox.addEventListener('click', event => {

        if (
            event.target === lightbox ||
            event.target.classList.contains('lightbox-close')
        ) {
            lightbox.classList.remove('show');
            lightboxImage.src = '';
        }

    });

}


// ==========================================
// 3. BIRTHDAY SURPRISE + FLOATING HEARTS
// ==========================================

const giftButton = document.getElementById('openGift');

if (giftButton) {

    giftButton.addEventListener('click', () => {

        const giftBox = document.getElementById('giftBox');
        const surpriseMessage = document.getElementById('surpriseMessage');

        if (giftBox) giftBox.classList.add('hidden');

        if (surpriseMessage) {
            surpriseMessage.classList.remove('hidden');
        }

        // Floating hearts animation

        for (let i = 0; i < 28; i++) {

            const heart = document.createElement('span');

            heart.textContent = ['💗', '💕', '✨', '🌸'][
                Math.floor(Math.random() * 4)
            ];

            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -30px;
                font-size: ${18 + Math.random() * 20}px;
                z-index: 50;
                pointer-events: none;
                transition: transform 3s linear, opacity 3s linear;
            `;

            document.body.appendChild(heart);

            requestAnimationFrame(() => {

                heart.style.transform =
                    `translateY(${window.innerHeight + 80}px)
                     rotate(${Math.random() * 300}deg)`;

                heart.style.opacity = '0';

            });

            setTimeout(() => {
                heart.remove();
            }, 3200);

        }

    });

}


// ==========================================
// 4. BACKGROUND BIRTHDAY MUSIC
// ==========================================
// ==========================================
// 4. BACKGROUND BIRTHDAY MUSIC - FIXED
// ==========================================

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

if (bgMusic && musicBtn) {

    let isPlaying = false;
    let isLoading = false;

    bgMusic.loop = true;

    musicBtn.addEventListener('click', async () => {

        // Prevent repeated clicks while music is starting
        if (isLoading) return;

        if (!bgMusic.paused) {

            bgMusic.pause();

            isPlaying = false;

            musicBtn.innerHTML = '🎵 Play Music';
            musicBtn.classList.remove('playing');

            return;
        }

        isLoading = true;
        musicBtn.disabled = true;

        try {

            await bgMusic.play();

            isPlaying = true;

            musicBtn.innerHTML = '🔊 Music Playing';
            musicBtn.classList.add('playing');

        } catch (error) {

            isPlaying = false;

            if (error.name !== 'AbortError') {
                console.error('Music playback failed:', error);
                musicBtn.innerHTML = '🎵 Try Again';
            }

        } finally {

            isLoading = false;
            musicBtn.disabled = false;

        }

    });

    // Update button when music pauses or starts
    bgMusic.addEventListener('pause', () => {

        isPlaying = false;

        musicBtn.innerHTML = '🎵 Play Music';
        musicBtn.classList.remove('playing');

    });

    bgMusic.addEventListener('play', () => {

        isPlaying = true;

        musicBtn.innerHTML = '🔊 Music Playing';
        musicBtn.classList.add('playing');

    });

}
