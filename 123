(function() {
    // 建立按鈕元素
    const button = document.createElement("div");
    button.innerText = "💬 聯繫我們";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = "#007bff";
    button.style.color = "#fff";
    button.style.padding = "10px 15px";
    button.style.borderRadius = "20px";
    button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";
    
    // 建立對話框
    const chatBox = document.createElement("div");
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "60px";
    chatBox.style.right = "20px";
    chatBox.style.width = "300px";
    chatBox.style.height = "400px";
    chatBox.style.background = "#fff";
    chatBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    chatBox.style.borderRadius = "10px";
    chatBox.style.display = "none";
    chatBox.style.zIndex = "1000";
    chatBox.style.overflow = "hidden";
    
    // 添加關閉按鈕
    const closeButton = document.createElement("div");
    closeButton.innerText = "✖";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "#333";
    
    // 內容區域
    const chatContent = document.createElement("div");
    chatContent.style.padding = "20px";
    chatContent.innerHTML = "歡迎！請輸入您的訊息...";
    
    chatBox.appendChild(closeButton);
    chatBox.appendChild(chatContent);
    
    // 點擊按鈕開啟對話框
    button.addEventListener("click", function() {
        chatBox.style.display = "block";
    });
    
    // 點擊關閉按鈕關閉對話框
    closeButton.addEventListener("click", function() {
        chatBox.style.display = "none";
    });
    
    // 插入網頁
    document.body.appendChild(button);
    document.body.appendChild(chatBox);
})();
