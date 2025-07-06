function convertKana(str, mode) {
    // 全角→半角の対応表
    const fullToHalfMap = {
        'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
        'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
        'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
        'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
        'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
        'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
        'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
        'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ', 'ラ': 'ﾗ', 'リ': 'ﾘ',
        'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ', 'ワ': 'ﾜ', 'ヲ': 'ｦ',
        'ン': 'ﾝ', 'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ',
        'ォ': 'ｫ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ', 'ッ': 'ｯ',
        'ー': 'ｰ', '。': '｡', '、': '､', '・': '･',
        'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
        'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
        'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
        'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
        'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
        'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
    };

    // 半角→全角の対応表（全角から自動生成）
    const halfToFullMap = {};
    for (const [full, half] of Object.entries(fullToHalfMap)) {
        halfToFullMap[half] = full;
    }

    if (mode === 'toFull') {
        // 半角→全角（複数文字も含む：ｶﾞ→ガ）
        const reg = new RegExp(Object.keys(halfToFullMap).sort((a, b) => b.length - a.length).join('|'), 'g');
        return str.replace(reg, match => halfToFullMap[match] || match);
    }

    if (mode === 'toHalf') {
        // 全角→半角（単一文字ベース）
        const reg = new RegExp(Object.keys(fullToHalfMap).join('|'), 'g');
        return str.replace(reg, match => fullToHalfMap[match] || match);
    }

    if (mode === 'kataToHira') {
        // カタカナ → ひらがな（Unicode：-0x60）
        return str.replace(/[\u30A1-\u30F6]/g, ch =>
            String.fromCharCode(ch.charCodeAt(0) - 0x60)
        );
    }

    if (mode === 'hiraToKata') {
        // ひらがな → カタカナ（Unicode：+0x60）
        return str.replace(/[\u3041-\u3096]/g, ch =>
            String.fromCharCode(ch.charCodeAt(0) + 0x60)
        );
    }

    // モードが不正な場合
    throw new Error("無効なモードです。'toFull', 'toHalf', 'kataToHira', 'hiraToKata' を指定してください。");
}
console.log(convertKana("ｶﾞｯﾂﾎﾟｰｽﾞ", "toFull"));     // ガッツポーズ
console.log(convertKana("ガッツポーズ", "toHalf"));     // ｶﾞｯﾂﾎﾟｰｽﾞ
console.log(convertKana("コンニチハ", "kataToHira"));  // こんにちは
console.log(convertKana("こんにちは", "hiraToKata"));  // コンニチハ
