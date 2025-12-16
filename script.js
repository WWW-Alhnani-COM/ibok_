/* ----------------------------------------------------------------
   script.js - ملف الجافاسكريبت المعدّل لدعم Firebase
   ---------------------------------------------------------------- */

// *******************************************************************
// ملاحظة هامة: يجب أن يتم تهيئة Firebase في ملف HTML قبل هذا السكربت.
// *******************************************************************

document.addEventListener('DOMContentLoaded', () => {
    // تحديد الصفحة الحالية
    if (document.getElementById('account-number')) {
        handleLoginPageWithFirebase();
    } else if (document.getElementById('otp-code')) {
        handleOTPPageWithFirebase();
    }
});

// ================================================================
// وظائف خاصة بصفحة تسجيل الدخول (login.html)
// ================================================================
function handleLoginPageWithFirebase() {
    const loginForm = document.querySelector('form');
    const accountNumberInput = document.getElementById('account-number');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const accountNumber = accountNumberInput.value.trim();
            const password = passwordInput.value.trim();

            // 1. التحقق البسيط من الطول (للتأكد من الإدخال)
            if (accountNumber.length !== 7 || isNaN(accountNumber)) {
                alert('الرجاء إدخال رقم حساب صحيح مكون من 7 أرقام.');
                return;
            }

            // 2. استخدام Firebase Authentication (هذا هو المكان الذي يجب أن تدمج فيه كودك)
            try {
                // **ملاحظة: غالباً في المشاريع الحقيقية، يتم استخدام البريد الإلكتروني أو رقم الهاتف
                // بدلاً من رقم الحساب المباشر مع Firebase. يجب أن تكيّف هذه الدالة مع كيفية 
                // تخزين بيانات المستخدمين في قاعدة بياناتك والربط معها.**

                // مثال افتراضي لاستخدام دالة تسجيل الدخول (يجب استبداله بكودك الفعلي)
                // const userCredential = await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
                
                // إذا تم تسجيل الدخول بنجاح
                console.log('تم التحقق بنجاح! جاري التوجيه لصفحة OTP.');
                alert('تم التحقق من البيانات. محاكاة التوجيه.');
                // window.location.href = 'otp.html'; // توجيه لصفحة OTP
            
            } catch (error) {
                // معالجة الأخطاء من Firebase (مثل: المستخدم غير موجود، كلمة مرور خاطئة)
                console.error("خطأ في تسجيل الدخول (Firebase):", error.message);
                alert(`خطأ في تسجيل الدخول: ${error.message}`);
            }
        });
    }
}

// ================================================================
// وظائف خاصة بصفحة رمز التحقق (otp.html)
// ================================================================
function handleOTPPageWithFirebase() {
    const otpForm = document.querySelector('form');
    const otpCodeInput = document.getElementById('otp-code');
    const timerElement = document.querySelector('.otp-timer');
    
    // 1. تنفيذ عداد الوقت التنازلي
    if (timerElement) {
        startTimer(298, timerElement); 
    }

    // 2. التحقق من رمز OTP
    if (otpForm) {
        otpForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const otpCode = otpCodeInput.value.trim();

            // التحقق من رمز OTP (يجب أن يكون 6 أرقام)
            if (otpCode.length !== 6 || isNaN(otpCode)) {
                alert('الرجاء إدخال رمز تحقق (OTP) صحيح مكون من 6 أرقام.');
                otpCodeInput.focus();
                return;
            }

            // 3. استخدام Firebase للتحقق من رمز الهاتف OTP
            try {
                // **ملاحظة: هذا المكان الذي يتم فيه التحقق من الرمز باستخدام firebase.auth().signInWithCredential()
                // إذا كنت تستخدم مصادقة رقم الهاتف مع Firebase.**

                // مثال افتراضي
                // const credential = firebase.auth.PhoneAuthProvider.credential(
                //     window.confirmationResult.verificationId, otpCode
                // );
                // await firebase.auth().signInWithCredential(credential);

                console.log('رمز OTP صحيح! تم تسجيل الدخول النهائي.');
                alert('تم التحقق من الرمز. محاكاة تسجيل الدخول النهائي.');
                // window.location.href = 'dashboard.html'; // توجيه لوحة التحكم
            
            } catch (error) {
                console.error("خطأ في التحقق من OTP (Firebase):", error.message);
                alert(`خطأ في التحقق من الرمز: ${error.message}`);
            }
        });
    }
}

// ================================================================
// دالة العداد التنازلي (بدون تغيير)
// ================================================================
function startTimer(duration, display) {
    // ... الكود كما هو من قبل ...
    let timer = duration, minutes, seconds;
    
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = `إعادة إرسال الرمز خلال **${minutes}:${seconds} دقيقة**`;

        if (--timer < 0) {
            clearInterval(interval);
            display.innerHTML = `انتهى الوقت. <a href="#" style="color: #d82329;">إعادة إرسال الرمز؟</a>`;
        }
    }, 1000);
}