/*jshint esversion: 6 */
window.addEventListener("DOMContentLoaded", () => {

    const cartWrapper = document.querySelector(".cart__wrapper");
    const cart = document.querySelector(".cart");
    const close = document.querySelector(".cart__close");
    const open = document.querySelector("#cart");
    const goodsBtn = document.querySelectorAll(".goods__btn");
    const products = document.querySelectorAll(".goods__item");
    const confirm = document.querySelector(".confirm");
    const badge = document.querySelector(".nav__badge");
    const totalCost = document.querySelector(".cart__total > span");
    const titles = document.querySelectorAll(".goods__title");
    const empty = cartWrapper.querySelector(".empty");
    // открыть корзину по клику
    var openCart = function () {
        cart.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    // закрыть корзину по клику
    var closeCart = function () {
        cart.style.display = "none";
        document.body.style.overflow = "";
    }

    // сократить название для карточки, для одинаковой длины карточек
    var sliceTitle = function () {
        titles.forEach(function (item) { // сокращение названия продукта для карточки, до 70 знаков = нужно для оптимизиции данных с сервака

            if (item.textContent.length < 70) {
                return; // ничего не делать
            } else {
                const str = item.textContent.slice(0, 70) + "..."; // оставь от 0 до 70 - остальное отрежь
                // const str = "${item.textContent.slice(0, 70)}..."; // тоже самое на ES6
                item.textContent = str; // замена названия на обрезанное

            }
        });
    }

    // анимация добавления в корзину
    var showConfirm = function () {
        confirm.style.display = "block"; // задаем элементу дисплей блок
        let counter = 100; // создаем счетчик для анимации
        const id = setInterval(frame, 10); // дали имя функции интервала, что бы ее можно было остановить

        function frame() {
            if (counter == 10) { // тк завязано на опасити
                clearInterval(id);
                confirm.style.display = "none";
            } else { // если больше сотни
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`; // сдвигаем по оси Y
                confirm.style.opacity = "." + counter; // увеличиваем прозрачность
            }
        }
    }

    // считает кол-во товаров в корзине
    var calcGoods = function (i) {
        const items = cartWrapper.querySelectorAll(".goods__item");
        badge.textContent = items.length + i;
    }

    // считает сумму товаров в корзине
    var calcTotal = function () {
        const prices = document.querySelectorAll(".cart__wrapper > .goods__item > .goods__price > span"); // добрались до цен товаров в корзине
        let total = 0; //счет идет с 0

        prices.forEach(function (item) {
            total += +item.textContent;
        });
        totalCost.textContent = total;
    }

    var showBusketMessage = function () {
        (cartWrapper.childElementCount - 1) > 0 ? empty.style.display = "none" : empty.style.display = "block";
    }

    //удаление товаров из корзины, по клику на крестик товара
    var removeFromCart = function () {
        const removeBtn = cartWrapper.querySelectorAll(".goods__item-remove");
        removeBtn.forEach(function (btn) {
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
                calcGoods();
                calcTotal();
                showBusketMessage();
                console.log("cartWrapper.childElementCount after " + (cartWrapper.childElementCount - 1));
            });
        });
    }


    goodsBtn.forEach(function (btn, i) { //  на каждую конпку добавить в корзину делаем функцию,
        //тк это массив элементов, то берем forEach, где иет - это каждая кнопка массива, а i это ее индекс
        // внутри каждый элмент массива - это btn
        btn.addEventListener("click", () => { // вешаем на каждый баттон анонимный обработчик
            let item = products[i].cloneNode(true), // клонируем элемент массива продукт, с индексом i который соответсвует нашему btn
                trigger = item.querySelector("button"),
                removeBtn = document.createElement("div");
                // empty = cartWrapper.querySelector(".empty");

                trigger.remove(); // удаляем баттон добавить в корзину на каждой карточке
            showConfirm(); // dпоказывает анимацию при добавлении в корзину
            calcGoods(1); // меняет цифру, отражающую кол-во товаров в корзине, 1 стоит для прибавления кол-ва товаров

            removeBtn.classList.add("goods__item-remove"); //конпке удалить доавбляем класс для стилей
            removeBtn.innerHTML = "&times"; // значок крестик, который будет внутри кнопки
            item.appendChild(removeBtn); // вставляем в нашу карточки кнопку удалить
            cartWrapper.appendChild(item); // вставляем карточку товара в корзину



            removeFromCart(); // добавляет функцию удаления товара на крестик(сама функция ниже)
            calcTotal() // меняет сумму товаров в корзине
            // if (empty) {
            //     empty.remove();
            // }
            showBusketMessage();
            // cartWrapper.childElementCount > 0 ? empty.style.display = "none": empty.style.display = "block";
            console.log("cartWrapper.childElementCount before " + (cartWrapper.childElementCount - 1));
        });
    });


    sliceTitle();
    open.addEventListener("click", openCart);
    close.addEventListener("click", closeCart);

});