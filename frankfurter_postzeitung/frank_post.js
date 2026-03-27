/**
 * Frankfurter Postzeitung - Carousel Controls
 * Provides scroll buttons and scroll markers for the main content carousel
 */

class CarouselControls {
    constructor(containerSelector = '.main-content-container') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.items = this.container.querySelectorAll('.main-content-item');
        this.currentItemIndex = 0;

        this.init();
    }

    init() {
        this.createControls();
        this.attachEventListeners();
        this.updateMarkers();
    }

    /**
     * Create scroll buttons and markers
     */
    createControls() {
        // Create scroll buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'carousel-controls';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-btn-prev';
        prevBtn.innerHTML = '← Previous';
        prevBtn.setAttribute('aria-label', 'Scroll to previous item');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-btn-next';
        nextBtn.innerHTML = 'Next →';
        nextBtn.setAttribute('aria-label', 'Scroll to next item');

        buttonsContainer.appendChild(prevBtn);
        buttonsContainer.appendChild(nextBtn);

        // Create markers container
        const markersContainer = document.createElement('div');
        markersContainer.className = 'carousel-markers';

        this.items.forEach((item, index) => {
            const marker = document.createElement('button');
            marker.className = 'carousel-marker';
            marker.setAttribute('data-index', index);
            marker.setAttribute('aria-label', `Go to item ${index + 1}`);
            marker.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
            markersContainer.appendChild(marker);
        });

        // Insert controls after container
        this.container.parentNode.insertBefore(buttonsContainer, this.container.nextSibling);
        this.container.parentNode.insertBefore(markersContainer, buttonsContainer.nextSibling);

        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.markersContainer = markersContainer;
        this.markers = markersContainer.querySelectorAll('.carousel-marker');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Scroll buttons
        this.prevBtn.addEventListener('click', () => this.scrollPrev());
        this.nextBtn.addEventListener('click', () => this.scrollNext());

        // Marker buttons
        this.markers.forEach((marker, index) => {
            marker.addEventListener('click', () => this.scrollToItem(index));
        });

        // Container scroll listener for marker updates
        this.container.addEventListener('scroll', () => this.onScroll());
    }

    /**
     * Scroll to previous item
     */
    scrollPrev() {
        if (this.currentItemIndex > 0) {
            this.scrollToItem(this.currentItemIndex - 1);
        }
    }

    /**
     * Scroll to next item
     */
    scrollNext() {
        if (this.currentItemIndex < this.items.length - 1) {
            this.scrollToItem(this.currentItemIndex + 1);
        }
    }

    /**
     * Scroll to specific item by index
     */
    scrollToItem(index) {
        if (index < 0 || index >= this.items.length) return;

        const item = this.items[index];
        this.container.scrollTo({
            left: item.offsetLeft,
            behavior: 'smooth'
        });

        this.currentItemIndex = index;
        this.updateMarkers();
        this.updateButtonStates();
    }

    /**
     * Handle scroll event - update markers based on current scroll position
     */
    onScroll() {
        // Find the most visible item
        let closestIndex = 0;
        let closestDistance = Infinity;

        this.items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + item.clientWidth / 2;
            const containerCenter = this.container.scrollLeft + this.container.clientWidth / 2;
            const distance = Math.abs(itemCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== this.currentItemIndex) {
            this.currentItemIndex = closestIndex;
            this.updateMarkers();
            this.updateButtonStates();
        }
    }

    /**
     * Update marker states
     */
    updateMarkers() {
        this.markers.forEach((marker, index) => {
            const isActive = index === this.currentItemIndex;
            marker.classList.toggle('active', isActive);
            marker.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    /**
     * Update button disabled states
     */
    updateButtonStates() {
        this.prevBtn.disabled = this.currentItemIndex === 0;
        this.nextBtn.disabled = this.currentItemIndex === this.items.length - 1;
    }
}

// Initialize carousel controls when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CarouselControls('.main-content-container');
});
