export function openNav(): void {
    const mySidenav = document.getElementById("mySidenav");
    if (mySidenav) {
        mySidenav.style.width = "100%";
    }
}

export function closeNav(): void {
    const mySidenav = document.getElementById("mySidenav");
    if (mySidenav) {
        mySidenav.style.width = "0";
    }
}

export function openNavMid(): void {
    const mySidenavMid = document.getElementById("mySidenavMid");
    if (mySidenavMid) {
        mySidenavMid.style.width = "360px";
    }
}

export function closeNavMid(): void {
    const mySidenavMid = document.getElementById("mySidenavMid");
    if (mySidenavMid) {
        mySidenavMid.style.width = "0";
    }
} 