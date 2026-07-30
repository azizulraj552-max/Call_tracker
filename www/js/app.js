let femaleVoice = null;

// অ্যাপ ওপেন হওয়ার সাথে সাথে অটোমেটিক ব্যাকগ্রাউন্ডে রান হওয়া এবং ভয়েস সেটআপ করা
window.onload = function() {
    loadVoices();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    console.log("Auto background announcer initialized successfully.");
};

// মহিলা কন্ঠ (Female Voice) সিলেক্ট করার ফাংশন
function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    
    // বাংলা বা উপযুক্ত মহিলা ভয়েস ফিল্টার করা
    femaleVoice = voices.find(v => (v.lang.includes('bn') || v.lang.includes('en')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google') || v.name.includes('Zira') || v.name.includes('Samantha')));
    
    if (!femaleVoice) {
        femaleVoice = voices.find(v => v.lang.includes('bn')) || voices[0];
    }
}

// সুপার ফাস্ট ন্যানোসেকেন্ড রেসপন্স ইঞ্জিন
function speakInstant(text) {
    if (!('speechSynthesis' in window)) return;
    
    // আগের কোনো ভয়েস থাকলে তা ইনস্ট্যান্ট রিমুভ করে নতুনটি বলা শুরু করবে
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    utterance.lang = 'bn-BD';
    utterance.rate = 1.05; // দ্রুত ও স্পষ্ট গতি
    utterance.pitch = 1.3;  // পিচ বাড়িয়ে মহিলা কন্ঠ নিশ্চিত করা
    
    window.speechSynthesis.speak(utterance);
}

// কল আসলে ১ সেকেন্ডের মধ্যে ট্রিগার হওয়ার লজিক
function onIncomingCall(callerName) {
    let announcement = `বন্ধু আজিজুল, ${callerName} তোমাকে কল দিয়েছে, কলটি রিসিভ করো।`;
    speakInstant(announcement);
}

// মেসেজ আসলে ট্রিগার হওয়ার লজিক
function onIncomingMessage(senderName) {
    let announcement = `বন্ধু আজিজুল, ${callerName || senderName} তোমাকে মেসেজ দিয়েছে।`;
    speakInstant(announcement);
      }
