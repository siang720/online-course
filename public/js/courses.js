/*********************************************************************************

適用範圍：
首頁及其他所有頁面

功能：
1.各頁面上方 navbar 的購物車圖示之商品數量，於連結該頁面時，自動校正
2.將商品加入購物車：異動 購物車圖示之商品數量、跳出訊息
3.將商品移除購物車：異動 購物車圖示之商品數量、跳出訊息

**********************************************************************************/
$(document).ready(function () {
  // 確認購物車中商品數量(每次到新頁面都會執行，以校正購物車中商品數量)
  // 取得的購物車中商品數量，先放至 local storage，再從 Local storage 取出，顯示在購物車 icon 數量上
  axios
    .get("/cart/checkcartitems")
    .then(res => {
      let data;
      if (!localStorage.getItem("shopcart")) {
        data = {
          itemCount: 0
        };
        // 放回 localstrorage
        localStorage.setItem("shopcart", JSON.stringify(data));

        // 取出回傳的值，並放進 localstorage
        data.itemCount = res.data.itemCount;
        $("#shopcart span").attr("data-count", data.itemCount);

        // 放回 localstrorage
        localStorage.setItem("shopcart", JSON.stringify(data));
      } else {
        let data = JSON.parse(localStorage.getItem("shopcart"));
        if (res.data.status === "success") {
          // 取出回傳的值，並放進 localstorage
          data.itemCount = res.data.itemCount;
          $("#shopcart span").attr("data-count", data.itemCount);

          // 放回 localstrorage
          localStorage.setItem("shopcart", JSON.stringify(data));
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  // 首頁中點擊〈放入購物車〉的動作
  $(".shop-grid .shopping-cart").click(function (event) {
    event.preventDefault();
    let buyBtnParent = $(event.target).parents("form.course-item");
    let courseId = buyBtnParent.children("input").val();

    // 發送非同步請求
    axios
      .post(`/cart`, {
        courseId: courseId
      })
      .then(res => {
        let data = JSON.parse(localStorage.getItem("shopcart"));

        // 儲改 itemCount
        if (res.data.status === "success") {
          // 取出回傳的值，並放進 localstorage
          data.itemCount = res.data.itemCount;
          $("#shopcart span").attr("data-count", data.itemCount);

          // 放回 localstrorage
          localStorage.setItem("shopcart", JSON.stringify(data));

          let message = `${res.data.message}，選購完成後可點選頁面上方<br>  <i class="fa fa-shopping-cart fa-2x mx-1"></i>  購物車圖示進行結帳`;
          // 跳出訊息視窗
          $(".shop-message").html(message);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // 單一課程介紹頁面 點擊〈放入購物車〉的動作
  $(".addtocart__actions[data-type='addtocart'] .tocart").click(function (event) {
    event.preventDefault();
    let buyBtnParent = $(event.target).parents("form.course-item");
    let courseId = buyBtnParent.children("input").val();

    // 發送非同步請求
    axios
      .post(`/cart`, {
        courseId: courseId
      })
      .then(res => {
        let data = JSON.parse(localStorage.getItem("shopcart"));

        // 儲改 itemCount
        if (res.data.status === "success") {
          // 取出回傳的值，並放進 localstorage
          data.itemCount = res.data.itemCount;
          $("#shopcart span").attr("data-count", data.itemCount);

          // 放回 localstrorage
          localStorage.setItem("shopcart", JSON.stringify(data));

          let message = res.data.message;
          // 跳出訊息視窗
          $(".shop-message").text(message);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // 首頁 點擊〈加入願望清單〉的動作
  $(".shop-grid .add-favorite").click(function (event) {
    event.preventDefault();
    let buyBtnParent = $(event.target).parents("form.index-course-item");
    let courseId = buyBtnParent.children("input").val();

    // 發送非同步請求
    axios
      .post(`/favorite/${courseId}`)
      .then(res => {

        if (res.data.status === "success") {
          // 變換 button 內容：愛心 icon 呈紅色或白色
          buyBtnParent.children("button").toggleClass("remove-favorite")

          let message = res.data.message;
          // 跳出訊息視窗
          $(".shop-message").text(message);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // 願望清單頁 點擊〈移除願望清單〉的動作
  $(".favorite-list .add-favorite").click(function (event) {
    event.preventDefault();
    let buyBtnParent = $(event.target).parents("form.index-course-item");
    let courseId = buyBtnParent.children("input").val();

    // 發送非同步請求：從收藏清單中移除該課程
    axios
      .post(`/favorite/${courseId}`)
      .then(res => {

        if (res.data.status === "success") {
          //  移除整個課程卡片
          $(event.target).parents('.favorite-list').remove()

          let message = res.data.message;

          // 跳出訊息視窗
          $(".shop-message").text(message);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // 單一課程介紹頁面 點擊〈加入願望清單〉的動作
  $(".addtocart__actions[data-type='addfavorite'] .tocart").click(function (event) {
    event.preventDefault();
    let buyBtnParent = $(event.target).parents("form.course-item");
    let courseId = buyBtnParent.children("input").val();

    // 發送非同步請求
    axios
      .post(`/favorite/${courseId}`)
      .then(res => {
        // let data = JSON.parse(localStorage.getItem("shopcart"));

        // 儲改 itemCount
        if (res.data.status === "success") {
          // 取出回傳的值，並放進 localstorage
          // data.itemCount = res.data.itemCount;
          // $("#shopcart span").attr("data-count", data.itemCount);

          // // 放回 localstrorage
          // localStorage.setItem("shopcart", JSON.stringify(data));

          // 變換 button 內容：加至願望清單 or 從願望清單中移除
          if (res.data.isFavorited) {
            $(event.target).text('從願望清單中移除')
          } else if (res.data.isFavorited == false) {
            $(event.target).text('加入願望清單')
          }

          let message = res.data.message;
          // 跳出訊息視窗
          $(".shop-message").text(message);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });


  // 刪除購物車中物品的動作
  $(".shopping-cart-items .remove-item-from-Cart").click(function (event) {
    event.preventDefault();
    // 取得 cartItem id
    let cartItemId = $(event.target)
      .parents(".remove-item-from-Cart")
      .attr("data-cartitemid");
    // 取得 cart id
    let cartId = $(event.target)
      .parents(".remove-item-from-Cart")
      .attr("data-cartid");

    // 發送非同步請求
    axios
      .post(`/cartItem/${cartItemId}?_method=DELETE`, {
        cartid: cartId
      })
      .then(res => {
        let data = JSON.parse(localStorage.getItem("shopcart"));

        // 儲改 itemCount
        if (res.data.status === "success") {
          // 取出回傳的值，並放進 localstorage
          data.itemCount = res.data.itemCount;
          // 更正 shopcart icon 的商品數字
          $("#shopcart span").attr("data-count", data.itemCount);
          // 重新計算 total price
          let totalPrice = 0;
          res.data.items.forEach(d => {
            totalPrice += d.price * 1; //數量
          });
          // 顯示總價
          $("#totalPrice").text(`${totalPrice}  元`);

          // 重新計算 商品數
          let itemCount = res.data.items.length;
          // 變更 message: 購物車明細
          let message = `類物車明細  共 ${itemCount} 項商品`;
          $(".shopping-detail-msg").text(message);

          // 送出請求成功刪除該物品後，將該列移除
          $(event.target)
            .parents("tr")
            .remove();

          // 放回 localstrorage
          localStorage.setItem("shopcart", JSON.stringify(data));

          let messageToUser = res.data.message;
          // 跳出訊息視窗
          $(".shop-message").text(messageToUser);

          // 訊息視窗
          $("#myModal a.btn").on("click", function (e) {
            // just as an example...
            $("#myModal").modal("hide"); // dismiss the dialog
          });

          $("#myModal").on("hide", function () {
            // remove the event listeners when the dialog is dismissed
            $("#myModal a.btn").off("click");
          });

          $("#myModal").on("hidden", function () {
            // remove the actual elements from the DOM when fully hidden
            $("#myModal").remove();
          });

          $("#myModal").modal({
            // wire up the actual modal functionality and show the dialog
            backdrop: "static",
            keyboard: true,
            show: true // ensure the modal is shown immediately
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  // 點擊登出按扭時，清空 localstorage
  $("#logout").click(function (event) {
    event.preventDefault();

    // 發送請求登出
    axios
      .get("/logout")
      .then(res => {
        // 更正 shopcart icon 的商品數字為
        $("#shopcart span").attr("data-count", 0);
        // 清空 localstorage
        localStorage.removeItem("shopcart");
        if (res.data.redirect == "/") {
          window.location = "/index";
        } else if (res.data.redirect == "/signin") {
          window.location = "/signin";
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});
