import { setLocalStorage } from "./storage.mjs";
export function setDraggable(draggables, storedList, storageName, elementclass = ".media-box") {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            console.log(draggable, "dragging");
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            let newOrder = [];
            const updatedDraggables = document.querySelectorAll(elementclass);
            // console.log("updated draggables",updatedDraggables);  
            updatedDraggables.forEach(draggable => {
                const id = draggable.dataset.id;
                const type = draggable.dataset.type;
                newOrder.push(`${id}-${type}`);
            });
            console.log(updatedDraggables); 
            
            const originalIndexMap = new Map(storedList.map((item, index) => [`${item.id}-${item.type}`, index]));
            const orderMap = new Map(newOrder.map((id, index) => [id, index]));
            console.log(orderMap);
            storedList = storedList.sort((a, b) => {
                const indexA = orderMap.has(`${a.id}-${a.type}`) ? orderMap.get(`${a.id}-${a.type}`) : originalIndexMap.get(`${a.id}-${a.type}`);
                const indexB = orderMap.has(`${b.id}-${b.type}`) ? orderMap.get(`${b.id}-${b.type}`) : originalIndexMap.get(`${b.id}-${b.type}`);
                console.log("indexA", indexA, "indexB", indexB);
                return indexA - indexB;

            }
            );
            setLocalStorage(storageName, storedList);
        });
    });
}


export function addDraggableEvent(container) {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        // const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        const dragAfterElement = getDragAfterElement(container, e.clientY, e.clientX);
        if (dragAfterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, dragAfterElement);
        }
    });
}


export function getDragAfterElement(container, y, x) {
    const draggableElements = [...container.querySelectorAll('.media-box:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const yOffset = y - box.top - box.height / 2;
        const xOffset = x - box.left - box.width / 2;
        const offsetTotal = xOffset * xOffset + yOffset * yOffset;

        if (offsetTotal < closest.offsetDefault) {
            return { offsetDefault: offsetTotal, element: child };
        } else {
            return closest;
        }
    },
        { offsetDefault: Number.POSITIVE_INFINITY, element: null }
    ).element;
}