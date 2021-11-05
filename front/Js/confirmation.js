let url = new URL(window.location.href);
let orderId = url.searchParams.get('order');
document.querySelector("#orderId").innerText = orderId;
localStorage.clear();
sessionStorage.clear();


