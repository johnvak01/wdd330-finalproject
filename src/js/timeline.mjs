import { getLocalStorage, setLocalStorage } from "./storage.mjs";
import { addDraggableEvent, setDraggable } from "./draggable.mjs";

export class TimeLine {
    constructor(startTime = 0, endTime = 0, events = []) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timelineEvents = events;

        this.timeline = getLocalStorage("timeline");
        if (this.timeline.length == 0) {
            this.timeline = { timeline: { startTime: this.startTime, endTime: this.endTime, events: this.timelineEvents } };
        }
        setLocalStorage("timeline", this.timeline);
    }
    storeTimeline() {
        setLocalStorage("timeline", this.timeline);
    }
    updateTimeline(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.storeTimeline();
    }
    resetTimeline(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timelineEvents = [];
        this.storeTimeline();
    }
    updateTimelineEvents(events) {
        this.timelineEvents = events;
        this.timeline.timeline.events = this.timelineEvents;
        this.storeTimeline();
    }
    getTimeline() {
        return this.timeline;
    }
}

export class ItineraryList {
    constructor(listBox, list = []) {
        this.itineraryList = getLocalStorage("itinerary") || list;
        console.log(listBox);
        this.itineraryListBox = listBox;
    }
    getItineraryList() {
        return this.itineraryList;
    }
    pullItineraryList() {
        this.itineraryList = getLocalStorage("itinerary") || [];
    }
    pushItineraryList() {
        setLocalStorage("itinerary", this.itineraryList);
    }
    setItineraryList(events) {
        this.itineraryList = events;
        this.pushItineraryList();
    }
    updateItineraryList(newItem, add) {
        this.pullItineraryList();
        this.itineraryList = getLocalStorage("itinerary");
        if (add == true && !this.itineraryList.some(item => item.id === newItem.id)) {
            this.itineraryList.push(newItem);
        } else if (add == false) {
            this.itineraryList = this.itineraryList.filter(item => item.id !== newItem.id);
        }
        this.pushItineraryList();
    }
    updateItineraryListRAW(newItem) {
        this.itineraryList.push(newItem);
        this.pushItineraryList();
    }
    popItineraryList(value) {
        this.itineraryList
        let lastIndex = this.itineraryList.findLastIndex(item => item.type == value);
        if (lastIndex != -1) {
            this.itineraryList.splice(lastIndex, 1);
            this.pushItineraryList();
            return true;
        }
        return false;
    }

    updateItineraryBox() {
        this.itineraryListBox.innerHTML = "";
        let title = document.createElement("h2");
        title.textContent = "Itinerary Order";
        let list = document.createElement("ul");
        this.itineraryList.forEach((item) => {
            const newLI = document.createElement("li");
            newLI.textContent = item.title;
            newLI.setAttribute("draggable", true);
            newLI.dataset.id = item.id;
            newLI.dataset.type = item.type;
            newLI.classList.add("itinerary-list-li");
            list.appendChild(newLI);
        });
        // add draggability
        console.log("draggability");
        setDraggable([...list.querySelectorAll("li")], this.itineraryList, "itinerary", ".itinerary-list-li");
        addDraggableEvent(list);
        this.itineraryListBox.appendChild(list);
    }
}