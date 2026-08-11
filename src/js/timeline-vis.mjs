export class TimelineVis {
    constructor(startTime = 0, endTime = 0, container, events = []) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.tripDuration = endTime - startTime;
        this.container = container;
        this.events = events;
    }
    addEvent(event) {
        this.events.push(event);
        const eventElement = document.createElement('div');
        eventElement.classList.add('itinerary-event');
        this.container.appendChild(eventElement);
    }
    putEvents(events) {
        this.events = events;
        this.refreshTimelineContainer();
    }
    updateEventsColors(lineElement) {// Work on this next
        const eventElements = lineElement.querySelectorAll('.itinerary-section');
        let totalTime = this.endTime - this.startTime
        console.log(totalTime);
        eventElements.forEach((eventElement, index) => {
            console.log(eventElement.dataset.duration)
            if (totalTime - eventElement.dataset.duration < 0) {
                eventElement.classList.add('i-remainder');
                if (index == eventElements.length - 1) {
                    const overflowElement = document.createElement('span');
                    overflowElement.classList.add('itinerary-section', 'i-excess');
                    overflowElement.textContent = `${eventElement.dataset.duration - totalTime} min over`;
                    eventElement.after(overflowElement);
                }

            } else if (eventElement.dataset.type === 'break') {
                eventElement.classList.add('i-break');
            } else {
                eventElement.classList.add('i-filled');
            }

            totalTime -= eventElement.dataset.duration;
            // const color = this.getColorForEvent(event);
            // eventElement.style.backgroundColor = color;
        });
        if (totalTime > 0) {
            const placeholderElement = document.createElement('span');
            placeholderElement.classList.add('itinerary-section', 'i-placeholder');
            placeholderElement.textContent = `${Math.abs(totalTime)} min under`;
            lineElement.appendChild(placeholderElement);
        }
    }
    updateEventsSpan(lineElement) {
        const eventElements = lineElement.querySelectorAll('.itinerary-section');
        let totalDuration = 0
        let totalSpan = 110;

        eventElements.forEach((eventElement, index) => {
            if (parseInt(eventElement.dataset.duration)) {
                totalDuration += parseInt(eventElement.dataset.duration);
            }
            console.log(totalDuration);
        });
        // if (totalDuration == this.tripDuration) {
        //     totalSpan = 100;
        // }

        // lineElement.style.gridTemplateColumns = `repeat(${totalSpan}, 1fr)`;

        // eventElements.forEach((eventElement, index) => {
        //     let percentage = parseInt(eventElement.dataset.duration) / this.tripDuration;
        //     console.log("percentage", percentage);
        //     if (percentage == NaN) {
        //         eventElement.style.gridColumn = `span 20`;
        //     } else {
        //         eventElement.style.gridColumn = `span ${Math.floor(percentage)}`;

        //     }
        // });
    }
    refreshTimelineContainer() {
        this.container.innerHTML = '';
        const itin_start = document.createElement('div');
        const itin_end = document.createElement('div');
        const itin_line = document.createElement('div');

        itin_start.classList.add('itinerary-start');
        itin_end.classList.add('itinerary-end');
        itin_line.classList.add('itinerary-line');

        itin_start.textContent = this.startTime + "";
        itin_end.textContent = this.endTime + " Minutes";




        this.events.forEach((event) => {
            const eventElement = document.createElement('span');
            eventElement.classList.add('itinerary-section');
            eventElement.textContent = event.title;
            eventElement.dataset.duration = event.runtime;

            eventElement.dataset.type = event.type;

            itin_line.appendChild(eventElement);
        });
        this.updateEventsColors(itin_line);
        this.updateEventsSpan(itin_line);

        this.container.appendChild(itin_start);
        this.container.appendChild(itin_line);
        this.container.appendChild(itin_end);
    }
    addTime(time) {
        this.tripDuration += time;
        this.endTime += time;
        this.refreshTimelineContainer();
    }
    removeTime(time) {
        if (this.tripDuration - time < 0) {
            this.endTime = this.startTime;
            this.tripDuration = 0;
        } else {
            this.endTime -= time;
            this.tripDuration -= time;
        }
        this.refreshTimelineContainer();
    }

}