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
    XHR.open("POST", "/posts", true);
    //サーバーからのレスポンス形式を指定
    XHR.responseType = "json";
    //フォームの内容をサーバに送信
    XHR.send(formData);

  });
};

window.addEventListener('load', post);