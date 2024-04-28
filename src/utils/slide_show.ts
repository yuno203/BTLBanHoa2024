var listIndex: number = 0;
const list: HTMLCollectionOf<Element> = document.getElementsByClassName("silde_img");

export function Init(): void {
    for (let x of list as unknown as Element[]) {
        (x as HTMLElement).style.display = "none";
    }

    (list[listIndex] as HTMLElement).style.display = "block";
}

export function ShowLeft(): void {
    for (let x of list as unknown as Element[]) {
        (x as HTMLElement).style.display = "none";
    }
    if (listIndex === 0) {
        listIndex = list.length - 1;
    } else {
        listIndex--;
    }
    (list[listIndex] as HTMLElement).style.display = "block";
}

export function ShowRight(): void {
    for (let x of list as unknown as Element[]) {
        (x as HTMLElement).style.display = "none";
    }
    if (listIndex === list.length - 1) {
        listIndex = 0;
    } else {
        listIndex++;
    }
    (list[listIndex] as HTMLElement).style.display = "block";
}