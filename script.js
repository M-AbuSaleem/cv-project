// عند رفع السيرة وتحليلها
document.getElementById('resumeForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('resumeFile');
  const jobDescription = document.getElementById('jobDescription').value;

  if (fileInput.files.length === 0) {
    alert('الرجاء رفع ملف PDF');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('jobDescription', jobDescription);

  // إرسال إلى الباك اند (سنجهزه لاحقًا)
  const response = await fetch('/api/resume/analyze', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();

  // عرض النتائج
  document.getElementById('summary').innerText = 'الملخص: ' + data.summary;
  document.getElementById('strengths').innerText = 'نقاط القوة: ' + data.strengths.join(', ');
  document.getElementById('weaknesses').innerText = 'نقاط الضعف: ' + data.weaknesses.join(', ');
  document.getElementById('rating').innerText = 'التقييم العام: ' + data.rating;

  document.getElementById('result').classList.remove('d-none');
});


// فتح/إغلاق قائمة المستخدم
function toggleUserMenu() {
  const menu = document.getElementById('userDropdown');
  const isVisible = menu.style.display === 'flex';
  menu.style.display = isVisible ? 'none' : 'flex';
}

document.addEventListener('click', function (e) {
  const menu = document.getElementById('userDropdown');
  const icon = document.querySelector('.user-icon');

  if (!menu || !icon) return;

  // إذا الضغط خارج القائمة والأيقونة، يتم الإغلاق
  const clickedOutside = !menu.contains(e.target) && !icon.contains(e.target);

  if (clickedOutside) {
    menu.style.display = 'none';
  }
});
// منع إغلاق القائمة إذا الضغط تم داخل الأيقونة نفسها
const userIcon = document.querySelector('.user-icon');
if (userIcon) {
  userIcon.addEventListener('click', function (e) {
    e.stopPropagation(); // منع إغلاقها عند الضغط
    toggleUserMenu();
  });
}
