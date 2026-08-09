import { getLocalStorage, setLocalStorage } from "./storage.mjs";


export class TimeLine{
    constructor(startTime = 0, endTime = 0, events = []) {
        this.timeline = getLocalStorage("timeline") || {startTime: startTime, endTime: endTime, events: events};
        this.startTime = this.timeline.startTime;
        this.endTime = this.timeline.endTime;
        this.timelineEvents = this.timeline.events;
        setLocalStorage("timeline", this.timeline);
    }
    updateTimeline(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        setLocalStorage("timeline", {startTime: this.startTime, endTime: this.endTime, events: this.timelineEvents});
    }
    resetTimeline(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timelineEvents = [];
        setLocalStorage("timeline", {startTime: null, endTime: null, events: []});
    }
    updateTimelineEvents(events) {
        this.timelineEvents = events;
        setLocalStorage("timeline", {startTime: this.startTime, endTime: this.endTime, events: this.timelineEvents});
    }
    getTimeline() {
        return this.timeline;
    }
}