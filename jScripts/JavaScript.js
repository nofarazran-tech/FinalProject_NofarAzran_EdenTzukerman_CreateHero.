// פונקציה להצגת תמונת הדמות הנבחרת והסתרת השנייה
function toggleHeroImage() {
    // איתור פקדי כפתורי הרדיו של זכר ונקבה בטופס
    const radioMale = document.getElementById("radioHeroMale");
    const radioFemale = document.getElementById("radioHeroFemale");
    // איתור אלמנטי התמונה של הדמויות בHTML
    const imgMale = document.getElementById("imgMale");
    const imgFemale = document.getElementById("imgFemale");
// בדיקה איזה כפתור נבחר, והצגת התמונה המתאימה והסתרת השנייה
    if (radioMale.checked) {
        imgMale.style.display = "block";
        imgFemale.style.display = "none";
    } else if (radioFemale.checked) {
        imgFemale.style.display = "block";
        imgMale.style.display = "none";
    }
}

// פונקציה לבחירה של פריט ציוד אחד מכל קבוצה וניהול השקיפות
function selectSingleEquipment(groupName, clickedImgId, clickedCheckbox) {
// שליפת כל תיבות הסימון השייכות לאותה קבוצה
    const checkboxes = document.getElementsByName(groupName);

    // לולאה שעוברת על הפריטים בקבוצה וביטול סימון האחרים
    for (let i = 0; i < checkboxes.length; i++) {
        // אם התיבה הנוכחית אינה התיבה שעליה לחצו כרגע
        if (checkboxes[i] !== clickedCheckbox) {
            checkboxes[i].checked = false; //ביטול סימון
            // איתור תמונת הפריט האחר והחזרת השקיפות שלו לחצי
            let otherImgId = getImgIdByCheckbox(checkboxes[i].id);
            if (otherImgId) {
                document.getElementById(otherImgId).style.opacity = "0.5";
            }
        }
    }

    // איתור התמונה של הפריט שעליו לחצו
    const clickedImg = document.getElementById(clickedImgId);
    // אם התיבה סומנה נגדיר שקיפות מלאה, ואם בוטלה נחזיר לשקיפות חלקית
    if (clickedCheckbox.checked) {
        clickedImg.style.opacity = "1";
    } else {
        clickedImg.style.opacity = "0.5";
    }
}

// פונקציה לזיהוי תיבת הסימון והתמונה שלה
function getImgIdByCheckbox(chkId) {
    if (chkId === "chkBlueCloak") return "imgBlueCloak";
    if (chkId === "chkBlackCloak") return "imgBlackCloak";
    if (chkId === "chkPinkCloak") return "imgPinkCloak";
    if (chkId === "chkBlueShield") return "imgBlueShield";
    if (chkId === "chkBlackShield") return "imgBlackShield";
    if (chkId === "chkPinkShield") return "imgPinkShield";
    return "";
}

// פונקציה לבדיקת תקינות והפעלת כפתור האישור
function checkFormValidity() {
    // קליטת הערך מתיבת הטקסט של שם הגיבור
    const heroName = document.getElementById("heroName").value;
    const radioMale = document.getElementById("radioHeroMale");
    const radioFemale = document.getElementById("radioHeroFemale");
    const submitBtn = document.getElementById("submitBtn");
    // הכפתור יהפוך ללחיץ רק אם תיבת השם אינה ריקה וגם נבחר לפחות כפתור אחד
    submitBtn.disabled = !(heroName.trim() !== "" && (radioMale.checked || radioFemale.checked));
}

// פונקצית כפתור ללסיכום
function createHeroSummary() {
    // קליטת השם שהוזן ובדיקת המגדר שנבחר
    const heroName = document.getElementById("heroName").value;
    const radioMale = document.getElementById("radioHeroMale");
    // שמירת מחרוזת המגדר במשתנה
    let heroTypeStr = radioMale.checked ? "גיבור" : "גיבורה";
    // מערך ריק שישמור את פריטי הציוד שהמשתמש בחר
    let selectedEquipment = [];

    // בדיקה אילו תיבות סימון של ציוד נבחרו, והוספתן למערך
    if (document.getElementById("chkBlueCloak").checked) selectedEquipment.push("גלימה כחולה");
    if (document.getElementById("chkBlackCloak").checked) selectedEquipment.push("גלימה שחורה");
    if (document.getElementById("chkPinkCloak").checked) selectedEquipment.push("גלימה ורודה");
    if (document.getElementById("chkBlueShield").checked) selectedEquipment.push("מגן כחול");
    if (document.getElementById("chkBlackShield").checked) selectedEquipment.push("מגן שחור");
    if (document.getElementById("chkPinkShield").checked) selectedEquipment.push("מגן ורוד");

    // בדיקה האם נבחר ציוד, אם כן נשרשר את הפריטים, ואם לא נציג הודעה מתאימה
    let equipmentText = selectedEquipment.length > 0 ? selectedEquipment.join(", ") : "ללא ציוד נלווה";
    // איתור אזור הסיכום בHTML, הצגתו, והדפסת כל הנתונים שנאספו
    let summaryBox = document.getElementById("summaryResult");
    summaryBox.style.display = "block";
    summaryBox.innerHTML = "<strong>סיכום יצירת דמות:</strong><br>" +
        "שם הגיבור/ה: " + heroName + "<br>" +
        "סוג הדמות: " + heroTypeStr + "<br>" +
        "ציוד שנבחר: " + equipmentText;
}