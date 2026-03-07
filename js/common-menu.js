document.addEventListener('DOMContentLoaded', () => {
    const menuHtml = `
        <nav class="side-menu">
            <div class="menu-title">Tool Box</div>
            <ul>
                <li><a href="index.html">ホーム</a></li>
                <li><a href="ipa.html">IPA変換</a></li>
                <li><a href="other.html">他のツール</a></li>
            </ul>
        </nav>
    `;
    
    // bodyの先頭にメニューを挿入
    document.body.insertAdjacentHTML('afterbegin', menuHtml);
});
