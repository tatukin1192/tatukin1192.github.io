// 1. IPA → 日本語音素マッピングの拡充
const ipaToJpMap = {
    // 母音
    "i": "i", "y": "yu", "ɨ": "wi", "ʉ": "u", "ɯ": "u", "u": "u",
    "ɪ": "i", "ʏ": "u", "ʊ": "u",
    "e": "e", "ø": "u", "ɘ": "e", "ɵ": "o", "ɤ": "u", "o": "o",
    "ə": "a",  
    "ɛ": "e", "œ": "e", "ɜ": "a", "ɞ": "a", "ʌ": "a", "ɔ": "o",
    "æ": "ya", "ɐ": "a", 
    "a": "a", "ɶ": "a", "ä": "a", "ɑ": "a", "ɒ": "o", 

    // 子音
    "p": "p", "b": "b", "t": "t", "d": "d", "ʈ": "t", "ɖ": "d", "c": "ky", "ɟ": "gy", "k": "k", "ɡ": "g", "q": "k", "ɢ": "g", "ʡ": "h", "ʔ": "ッ",
    "m": "m", "ɱ": "m", "n": "n", "ŋ": "ŋ", "ɲ": "ny", "ɳ": "n", "ɴ": "ン", "ɰ̃": "ン",
    "ʙ̥": "p", "ʙ": "b", "r": "r", "ʀ": "r",
    "ⱱ" : "v", "ɾ": "r", "ɽ": "r",
    "ɸ": "f", "β": "b", "f": "f", "v": "v", "θ": "s", "ð": "z", "s": "s", "z": "z", "ʃ": "sh", "ʒ": "j", "ʂ": "sh", "ʐ": "j", "ç": "hy", "ʝ": "y", "x": "h", "ɣ": "g", "χ": "h", "ʁ": "g", "ħ": "h", "ʕ": "h", "h": "h", "ɦ": "h", 
    "ɬ": "sh", "ɮ": "j",
    "β̞": "w", "ʋ": "w", "ɹ": "r", "ɻ": "r", "j": "y", "ɰ": "w",
    "l": "r", "ɭ": "r", "ʎ": "j", "ʟ": "r",
    
    "w": "w", "ɥ": "yu", "ʍ": "w",
    "ʲ": "y", "ʷ": "w",
    
    "ɕ": "sh", "ʑ": "j",
    "t͡s": "ts", "d͡z": "dz", "t͡ʃ": "ch", "d͡ʒ": "j", "t͡ɕ": "ch", "d͡ʑ": "j", "t͡ɬ": "ch", "d͡ɮ": "j",
    
    "ʜ": "h", "ʢ": "h", "ɧ": "h", "ɺ": "r", "ɫ": "r",
    
    // 入破音
    "ɓ": "b", "ɗ": "d", "ʄ": "gy", "ɠ": "g", "ʛ": "g", "ᶑ": "d",
    "ɓ̥": "p", "ɗ̥": "t", "ʄ̊": "ky", "ɠ̊": "k", "ʛ̥": "k", "ᶑ̊": "t", 
    
    // 鼻母音（母音 + n/nn の形に変換）
    "ã": "an", "ẽ": "en", "ĩ": "in", "õ": "on", "ũ": "un",
    "ɛ̃": "en", "œ̃": "en", "ɔ̃": "on", "ɑ̃": "an",
    // 特殊
    "ː": "ー", "ʼ": "",
};

// --- 追加：表記ゆれ正規化マップ ---
const ipaNormalizeMap = {
    "ts": "t͡s", "t͜s": "t͡s", "ʦ": "t͡s", "ƾ": "t͡s",
    "dz": "d͡z", "d͜z": "d͡z", "ʣ": "d͡z",
    "tʃ": "t͡ʃ", "t͜ʃ": "t͡ʃ", "ʧ": "t͡ʃ",
    "dʒ": "d͡ʒ", "d͜ʒ": "d͡ʒ", "ʤ": "d͡ʒ",
    "tɕ": "t͡ɕ", "t͜ɕ": "t͡ɕ",
    "dʑ": "d͡ʑ", "d͜ʑ": "d͡ʑ",
    "tɬ": "t͡ɬ", "t͜ɬ": "t͡ɬ", "ƛ": "t͡ɬ",
    "dɮ": "d͡ɮ", "d͜ɮ": "d͡ɮ", "λ": "d͡ɮ",
    "g": "ɡ",
    "ƥ": "ɓ̥", "ƭ": "ɗ̥", "ƈ": "ʄ̊", "ƙ": "ɠ̊", "ʠ": "ʛ̥",
    ":": "ː",
};

// 2. 日本語音素 → カタカナ（拗音・外来語をさらに追加）
const jpToKana = {
    "a":"ア", "i":"イ", "u":"ウ", "e":"エ", "o":"オ",
    "ka":"カ", "ki":"キ", "ku":"ク", "ke":"ケ", "ko":"コ", "kー":"ッk",
    "ga":"ガ", "gi":"ギ", "gu":"グ", "ge":"ゲ", "go":"ゴ",
    "ŋa":"ガ", "ŋi":"ギ", "ŋu":"グ", "ŋe":"ゲ", "ŋo":"ゴ",
    "sa":"サ", "si":"スィ", "su":"ス", "se":"セ", "so":"ソ",
    "za":"ザ", "zi":"ズィ", "zu":"ズ", "ze":"ゼ", "zo":"ゾ",
    "ta":"タ", "ti":"ティ", "tu":"トゥ", "te":"テ", "to":"ト",
    "da":"ダ", "di":"ディ", "du":"ドゥ", "de":"デ", "do":"ド",
    "na":"ナ", "ni":"ニ", "nu":"ヌ", "ne":"ネ", "no":"ノ",
    "ha":"ハ", "hi":"ヒ", "hu":"フ", "he":"ヘ", "ho":"ホ",
    "ba":"バ", "bi":"ビ", "bu":"ブ", "be":"ベ", "bo":"ボ",
    "pa":"パ", "pi":"ピ", "pu":"プ", "pe":"ペ", "po":"ポ",
    "ma":"マ", "mi":"ミ", "mu":"ム", "me":"メ", "mo":"モ",
    "ya":"ヤ", "yi":"イィ", "yu":"ユ", "ye":"イェ", "yo":"ヨ",
    "ra":"ラ", "ri":"リ", "ru":"ル", "re":"レ", "ro":"ロ",
    "wa":"ワ", "wi":"ウィ", "wu":"ウゥ", "we":"ウェ", "wo":"ウォ",
    "ン":"ン", "ッ":"ッ", "ー":"ー",
    // 拗音（キャ行・ギャ行など）
    "kya":"キャ", "kyi":"キ", "kyu":"キュ", "kye":"キェ", "kyo":"キョ",
    "gya":"ギャ", "gyi":"ギ", "gyu":"ギュ", "gye":"ギェ", "gyo":"ギョ",
    "ŋya":"ギャ", "ŋyi":"ギ", "ŋyu":"ギュ", "ŋye":"ギェ", "ŋyo":"ギョ",
    "nya":"ニャ", "nyi":"ニ", "nyu":"ニュ", "nye":"ニェ", "nyo":"ニョ",
    "hya":"ヒャ", "hyi":"ヒ", "hyu":"ヒュ", "hye":"ヒェ", "hyo":"ヒョ",
    "mya":"ミャ", "myi":"ミ", "myu":"ミュ", "mye":"ミェ", "myo":"ミョ",
    "rya":"リャ", "ryi":"リ", "ryu":"リュ", "rye":"リェ", "ryo":"リョ",
    "pya":"ピャ", "pyi":"ピ", "pyu":"ピュ", "pye":"ピェ", "pyo":"ピョ",
    "bya":"ビャ", "byi":"ビ", "byu":"ビュ", "bye":"ビェ", "byo":"ビョ",
    // 英語・外来語用
    "sha":"シャ", "shi":"シ", "shu":"シュ", "she":"シェ", "sho":"ショ",
    "cha":"チャ", "chi":"チ", "chu":"チュ", "che":"チェ", "cho":"チョ",
    "ja":"ジャ", "ji":"ジ", "ju":"ジュ", "je":"ジェ", "jo":"ジョ",
    "fa":"ファ", "fi":"フィ", "fu":"フ", "fe":"フェ", "fo":"フォ",
    "va":"ヴァ", "vi":"ヴィ", "vu":"ヴ", "ve":"ヴェ", "vo":"ヴォ",
    "tsa":"サ", "tsi":"ツィ", "tsu":"ツ", "tse":"ツェ", "tso":"ツォ",
    "dza":"ザ", "dzi":"ズィ", "dzu":"ズ", "dze":"ゼ", "dzo":"ゾ",
    "tya":"テャ", "tyi":"ティ", "tyu":"テュ", "tye":"ティェ", "tyo":"テョ",
    "dya":"デャ", "dyi":"ディ", "dyu":"デュ", "dye":"ディェ", "dyo":"デョ",
    "kwa":"クァ", "kwi":"クィ", "kwu":"ク", "kwe":"クェ", "kwo":"クォ",
    "gwa":"グァ", "gwi":"グィ", "gwu":"グ", "gwe":"グェ", "gwo":"グォ",
    "sya":"スャ", "syi":"スィ", "syu":"スュ", "sye":"スィェ", "syo":"スョ",
    // 子音単独
    "k":"ク", "g":"グ", "s":"ス", "z":"ズ", "t":"ト", "d":"ド", 
    "n":"ン", "h":"フ", "f":"フ", "b":"ブ", "p":"プ", "m":"ム", 
    "y":"ィ", "r":"ル", "l":"ル", "v":"ヴ", "w":"ゥ", "th":"ス", "dh":"ズ",
    "sh":"シュ", "ch":"チュ", "j":"ジュ", "ts":"ツ", "dz":"ズ", "ny":"ン", "ŋ":"ン",
};
// 3. 解説データの拡充
const ipaDesc = {
// 母音
    "i": "日本語の「イ」に近い音",
    "y": "「ウ」の口で「イ」と発音する音",
    "ɨ": "「イ」と「ウ」の中間で、唇を丸めない音",
    "ʉ": "「イ」と「ウ」の中間で、唇を丸める音",
    "ɯ": "日本語の「ウ」に近いが、唇を丸めない音",
    "u": "日本語の「ウ」より唇を丸める音",

    "ɪ": "少し「エ」に近い、短い「イ」の音",
    "ʊ": "少し「オ」に近い、短い「ウ」の音",

    "e": "日本語の「エ」に近い音",
    "ø": "",
    "ɘ": "",
    "ɵ": "",
    "ɤ": "",
    "o": "日本語の「オ」に近い音",

    "ə": "曖昧な母音",

    "ɛ": "",
    "œ": "",
    "ɜ": "",
    "ɞ": "",
    "ʌ": "",
    "ɔ": "",


    "æ": "「ア」と「エ」の中間の音",
    "ɐ": "",

    "a": "日本語の「ア」に近い音",
    "ɶ": "",
    "ä": "日本語の「ア」に近い音",
    "ɑ": "",
    "ɒ": "",


// 子音（破裂音）
    "p": "日本語のパ行の子音",
    "b": "日本語のバ行の子音",
    "k": "日本語のカ行の子音",
    "ɡ": "日本語のガ行の子音",
    "t": "日本語のタ行の子音",
    "d": "日本語のダ行の子音",
    "ʔ": "",

    // 子音（鼻音）
    "m": "日本語のマ行の子音",
    "n": "日本語のナ行の子音",
    "ɲ": "日本語の「ニ」やニャ行の子音",
    "ŋ": "日本語のカ行やガ行の前の「ン」の音",
    "ɴ": "日本語の「ン」を単独で発音した際の音",
    "ɰ̃": "日本語の母音や半母音の前の「ン」の音",

    // 子音（ふるえ、はじき音）
    "ʙ": "唇を震わせて、バ行のように発音する子音",
    "ʙ̥": "唇を震わせて、パ行のように発音する子音",
    "r": "舌を震わせて発音する、巻き舌のR",
    "ɾ": "日本語のラ行の子音",

    // 子音（摩擦音）
    "ɸ": "日本語の「フ」やファ行の子音",
    "β": "",
    "f": "",
    "v": "",
    "θ": "舌を噛んで、サ行のように発音する子音",
    "ð": "舌を噛んで、ザ行のように発音する子音",
    "s": "日本語のサ行の子音",
    "z": "日本語のザ行の子音",
    "ʃ": "",
    "ʒ": "",
    "ɕ": "日本語の「シ」やシャ行の子音",
    "ʑ": "日本語の「ジ」やジャ行の子音",
    "ç": "日本語の「ヒ」やヒャ行の子音",
    "h": "日本語のハ行の子音",


    // 子音（接近音など）
    "β̞": "日本語のワ行の子音",
    "w": "日本語のワ行より唇を丸める子音",
    "l": "舌を歯茎に付けて、ラ行のように発音する子音",
    "ɹ": "",
    "j": "日本語のヤ行の子音",

    // 特殊・補助
    "ː": "直前の音を伸ばす",

    // 破擦音
    "d͡z": "",
    "t͡s": "日本語の「ツ」の子音",
    "t͡ʃ": "",
    "d͡ʒ": "",
    "t͡ɕ": "日本語の「チ」やチャ行の子音",
    "d͡ʑ": "",

    // 補助記号
    "ˈ": "第一アクセント。次に続く音節が最も強く読まれる",
    "ˌ": "第二アクセント。次に続く音節がやや強く読まれる",
    "̥": "無声化記号。有声音の下に付き、声帯を震わせないことを示す"};

// トークナイズ処理（IPA辞書のキーが長い順にマッチングさせる）
function tokenizeIPA(str) {
    let tokens = [];
    let i = 0;
    const sortedIpaKeys = Object.keys(ipaToJpMap).sort((a, b) => b.length - a.length);

    while (i < str.length) {
        let match = null;
        for (let key of sortedIpaKeys) {
            if (str.substr(i, key.length) === key) {
                match = key;
                break;
            }
        }
        if (match) {
            tokens.push(match);
            i += match.length;
        } else {
            // ここで空白や未定義文字が1文字ずつ入る
            tokens.push(str[i]);
            i++;
        }
    }
    return tokens;
}

function processIPA(isAuto = false) {
    const rawInput = document.getElementById('ipaInput').value;
    const resultArea = document.getElementById('resultArea');

    // チェックボックスからの自動更新(isAuto=true)かつ、入力が空または一度も変換していない場合は何もしない
    if (isAuto && (rawInput.trim() === "" || resultArea.style.display === "none")) {
        return;
    }

    let normalizedInput = rawInput;

    const sortedIpaKeys = Object.keys(ipaToJpMap).sort((a, b) => b.length - a.length);

    // --- STEP 0: 表記の正規化 ---
    const normKeys = Object.keys(ipaNormalizeMap).sort((a, b) => b.length - a.length);
    normKeys.forEach(key => {
        normalizedInput = normalizedInput.split(key).join(ipaNormalizeMap[key]);
    });

    // --- 追加：内部変換用の変数を分離 ---
    let processingInput = normalizedInput;

    // --- STEP 0.5: 子音 + ː を子音重ねに置換 (t͡sː -> t͡st͡s 等) ---
    const consonantsOnly = "pbtdʈɖcɟkɡqɢʡʔmɱnŋɲɳɴʙrʀⱱɾɽɸβfvθðszʃʒʂʐçʝxɣχʁħʕhɦɬɮʋɹɻjɰlɭʎʟwɥʍɕʑɓɗʄɠʛᶑ";
    
    for (const key of sortedIpaKeys) {
        // keyが子音リストに含まれている場合のみ、重ね処理を行う
        if (consonantsOnly.includes(key)) {
            const target = key + "ː";
            if (processingInput.includes(target)) {
                processingInput = processingInput.split(target).join(key + key);
            }
        }
    }

    // --- STEP 1: 中間音素へ変換（知らない文字をスキップしつつ改行は保持） ---
    let intermediate = "";
    let tempInput = processingInput; // 内部変換用を使用

    while (tempInput.length > 0) {
        let matched = false;

        // 改行はスキップせず保持
        if (tempInput.startsWith("\n")) {
            intermediate += "\n";
            tempInput = tempInput.slice(1);
            continue;
        }

        // 【追加】空白（半角・全角）を一時的に半角スペースとして保持
        if (tempInput.startsWith(" ") || tempInput.startsWith("　")) {
            intermediate += " "; 
            tempInput = tempInput.slice(1);
            continue;
        }

        for (const key of sortedIpaKeys) {
            if (tempInput.startsWith(key)) {
                let val = ipaToJpMap[key];
                intermediate += val;
                tempInput = tempInput.slice(key.length);
                matched = true;
                break;
            }
        }
        
        if (!matched) {
            // 知らない文字は "" として扱う（スキップ）
            tempInput = tempInput.slice(1);
        }
    }

    // --- STEP 2: カタカナ変換 ---
    let finalKana = ""; // ここを innerHTML で流し込む場合は最終的に HTML 文字列になります
    let i = 0;
    const vowels = "aiueo";
    
    // 追加：チェックボックスの状態を取得
    const isSmallConsonant = document.getElementById('smallConsonant').checked;
    // 追加：小さくする対象となる「子音単独」のキーリスト
    const singleConsonants = ["k", "g", "s", "z", "t", "d", "n", "h", "f", "b", "p", "m", "y", "r", "l", "v", "w", "th", "dh", "sh", "ch", "j", "ts", "dz", "ny", "ŋ"];

    while (i < intermediate.length) {
        let curr = intermediate[i];
        let next = intermediate[i + 1];

        if (curr === " ") { finalKana += "　"; i++; continue; }
        if (curr === "ー") { finalKana += "ー"; i++; continue; }
        if (curr === "ッ") { finalKana += "ッ"; i++; continue; }

        if (curr === "m" && (next === "b" || next === "p")) {
            finalKana += "ン";
            i++;
            continue; 
        }

        let match = null;
        let matchedLen = 0;
        let matchedKey = ""; // マッチしたキーを保持
        for (let len = 4; len >= 1; len--) {
            let chunk = intermediate.substr(i, len);
            if (jpToKana[chunk]) {
                match = jpToKana[chunk];
                matchedLen = len;
                matchedKey = chunk; // 判定用に保存
                break;
            }
        }

        if (match) {
            let res = match;
            let remaining = intermediate.slice(i + matchedLen);
            if (remaining.length > 0 && !vowels.includes(remaining[0])) {
                let currentConsonantBase = intermediate.substr(i, matchedLen).replace(/[aiueo]/g, "");
                let nextConsonantBase = remaining.substr(0, 2).replace(/[aiueo]/g, "");
                
                if (currentConsonantBase !== "" && currentConsonantBase !== "y" && nextConsonantBase.startsWith(currentConsonantBase)) {
                    if (currentConsonantBase === "n" || currentConsonantBase === "m") {
                        // スキップ
                    } else {
                        finalKana += "ッ";
                        i += matchedLen;
                        continue;
                    }
                }
            }
            
            // --- ここでサイズ変更の判定 ---
            if (isSmallConsonant && singleConsonants.includes(matchedKey)) {
                finalKana += `<span class="small-char">${res}</span>`;
            } else {
                finalKana += res;
            }
            
            i += matchedLen;
        } else {
            // ...以下、既存のフォールバック処理...
            if (next && curr === next && "bcdfghjklpqrstvwxyz".includes(curr)) {
                finalKana += "ッ";
                i++;
            } else if (jpToKana[curr]) {
                finalKana += jpToKana[curr];
                i++;
            } else {
                finalKana += curr;
                i++;
            }
        }
    }

    // 最後に innerHTML で出力（spanタグを有効にするため）
    document.getElementById('kanaOutput').innerHTML = finalKana;

    // --- STEP 3: 解説表示 (省略せず既存のロジックを使用してください) ---
    //document.getElementById('kanaOutput').innerText = finalKana;
    // ...以下、解説表示の処理...
    displayExplanation(normalizedInput, sortedIpaKeys); 
}

// --- 追加：サニタイズ用の関数 ---
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

function displayExplanation(normalizedInput, sortedIpaKeys) {
    const resultArea = document.getElementById('explanationBody');
    resultArea.innerHTML = ""; 
    
    const lines = normalizedInput.split('\n');

    lines.forEach((line) => {
        if (line.trim() === "") return; 

        // 入力行をエスケープして表示
        let safeLine = escapeHTML(line);
        let tableRows = `<tr><th colspan="2" class="ipa-input-org">${safeLine}</th></tr>`;
        
        let tempStr = line;
        while (tempStr.length > 0) {
            let found = false;
            for (let key of sortedIpaKeys) {
                if (tempStr.startsWith(key)) {
                    if (!/\s/.test(key)) {
                        let desc = ipaDesc[key] || "解説なし";
                        // keyとdescをエスケープして結合
                        tableRows += `
                            <tr>
                                <td class="ipa-sym">${escapeHTML(key)}</td>
                                <td><div>${escapeHTML(desc)}</div></td>
                            </tr>`;
                    }
                    tempStr = tempStr.slice(key.length);
                    found = true;
                    break;
                }
            }
            if (!found) {
                let unknownChar = tempStr[0];
                if (!/\s/.test(unknownChar)) {
                    tableRows += `
                        <tr>
                            <td class="ipa-sym">${escapeHTML(unknownChar)}</td>
                            <td><div>未定義の記号</div></td>
                        </tr>`;
                }
                tempStr = tempStr.slice(1);
            }
        }
        resultArea.innerHTML += tableRows;
    });

    document.getElementById('resultArea').style.display = "block";
}
