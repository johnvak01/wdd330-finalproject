export class TimelineVis {
    constructor(startTime = 0, endTime = 0, container) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.container = container;
        this.events = [];
    }
    addEvent(event) {
        this.events.push(event);
        const eventElement = document.createElement('div');
        eventElement.classList.add('itinerary-event');
        this.container.appendChild(eventElement);
    }
    updateEventsColors(lineElement) {// Work on this next
        const eventElements = lineElement.querySelectorAll('.itinerary-section');
        let totalTime = this.endTime - this.startTime;
        eventElements.forEach((eventElement, index) => {
            if (totaltime - eventElement.dataset.duration < 0) {
                eventElement.classList.add('i-remainder');
                const overflowElement = document.createElement('span');
                overflowElement.classList.add('itinerary-section', 'i-excess');
                overflowElement.textContent = `${eventElement.dataset.duration - totalTime} min over`;
                eventElement.after(overflowElement);
            } else if (eventElement.dataset.type === 'break') {
                eventElement.classList.add('i-break');
            } else {
                eventElement.classList.add('i-filled');
            }

            totalTime -= eventElement.dataset.duration;



            const color = this.getColorForEvent(event);
            eventElement.style.backgroundColor = color;
        });
        if (totalTime > 0) {
            const placeholderElement = document.createElement('span');
            placeholderElement.classList.add('itinerary-section', 'i-placeholder');
            placeholderElement.textContent = `${Math.abs(totalTime)} min under`;

        }
    }
    refreshTimelineContainer() {
        this.container.innerHTML = '';
        const itin_start = document.createElement('div');
        const itin_end = document.createElement('div');
        const itin_line = document.createElement('div');

        itin_start.classList.add('itinerary-start');
        itin_end.classList.add('itinerary-end');
        itin_line.classList.add('itinerary-line');

        itin_start.textContent = this.startTime;
        itin_end.textContent = this.endTime;

        foreach(this.events, (event) => {
            const eventElement = document.createElement('span');
            eventElement.classList.add('itinerary-section');
            eventElement.textContent = event.title;
            eventElement.dataset.duration = event.duration;
            eventElement.dataset.type = event.type;

            this.container.appendChild(eventElement);
        });
        this.updateEventsColors(itin_line);

        this.container.appendChild(itin_start);
        this.container.appendChild(itin_line);
        this.container.appendChild(itin_end);
    }

}