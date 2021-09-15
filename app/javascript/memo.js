//HTML生成要素の切り出し 可読性を上げるため
//戻り値 HTML１ブロック分
const buildHTML = (XHR) => {
        //XHR.response.postの「post」がコントローラで作ったjspon形式の返却パラメータ
      //render json:{post: post}←これ
      const item = XHR.response.post;
      //レスポンスから受け取った値をもとにHTMLを生成
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      return html;
 };


function post (){
  //サーバーサイドにリクエスト送信時の処理
  const submit = document.getElementById("submit");

  submit.addEventListener('click', (e) => {
    //デフォルトのブラウザからのリクエスト送信を無効 eはなんでもいいがeventのeでよく使われるらしい
    e.preventDefault();

    // debugger
    //フォームの要素取得
    const form = document.getElementById("form");
    //フォームの内容取得(FormData)
    const formData = new FormData(form);
    //XMLHttpRequestオブジェクト生成
    const XHR = new XMLHttpRequest();
    //openメソッドでリクエストの内容を指定
    //これによりサーバ側のルーティングが決まるのでcreateアクションが動く
    XHR.open("POST", "/posts", true);
    //サーバーからのレスポンス形式を指定
    XHR.responseType = "json";
    //フォームの内容をサーバに送信
    XHR.send(formData);
    //リクエストの送信が成功した時、動くメソッド
    XHR.onload = () => {
      //HTTPステータスコード（２００が正常）による処理の分岐
        if (XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`)
          //return nullでjavaScriptの処理を終了する。のちのコードは読み込まない
          return null;
        };

      //HTMLを追加したい付近の要素を取得（後の処理でその近辺にHTMLを取得するため）
      const list = document.getElementById("list");
      //フォームの値を取得（表への挿入後,フォームの値を削除するための処理に使用する）
      const formText = document.getElementById("content");

        //listと指定したHTML要素の直後（afterend）に
        //HTMLを作る要素を分けた「buildHTML(XHR)を実行して、戻り値のHTMLを挿入している
        //第一引数は４種類（どこに挿入するか）、第二引数に挿入したいHTML
        list.insertAdjacentHTML("afterend", buildHTML(XHR));
        //表へのデータ挿入後、フォームのデータを削除している
        formText.value = "";      
    };

  });
};

window.addEventListener('load', post);