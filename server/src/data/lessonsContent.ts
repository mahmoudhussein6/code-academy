import { ILesson } from '../types';

export const lessonsData: ILesson[] = [
  // ----------------------------------------------------
  // HTML Lesson 1: what-is-html-and-web-basics
  // ----------------------------------------------------
  {
    slug: 'what-is-html-and-web-basics',
    courseSlug: 'html-fundamentals',
    moduleSlug: 'html-intro-module',
    order: 1,
    title: 'ما هي HTML وكيف تعمل صفحات الويب؟',
    readTimeMinutes: 6,
    summary: 'مدخل مبسط للمبتدئين: كيف يطلب المتصفح صفحة الويب وكيف تقرأ لغة HTML وتتحول إلى شاشة مرئية.',
    interactiveExercise: {
      instructions: 'عدّل وسم العنوان `<h1>` لكتابة اسمك أو عبارة ترحيبية باللغة العربية، ثم لاحظ كيف يعرضها المتصفح فوراً!',
      initialHtml: `<!DOCTYPE html>
<html>
  <body>
    <h1>مرحباً بك في كود أكاديمي!</h1>
    <p>هذا أول سطر كود HTML أكتبه بيدي.</p>
  </body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
  <body>
    <h1>أنا مطور ويب مستقبلي!</h1>
    <p>أتعلم برمجة الويب من الصفر باللغة العربية.</p>
  </body>
</html>`,
    },
    quiz: {
      question: 'ما هو الدور الأساسي للغة HTML في بناء صفحات الويب؟',
      options: [
        'تحديد ألوان وتنسيقات الصفحة وخطوطها',
        'بناء الهيكل العظمي وتنظيم محتوى الصفحة (نصوص، عناوين، صور)',
        'برمجة الخوادم وقواعد البيانات وحفظ كلمات المرور',
        'تشغيل الرسوم المتحركة المعقدة ثلاثية الأبعاد',
      ],
      correctIndex: 1,
      explanation: 'لغة HTML (HyperText Markup Language) هي المسؤولة حصراً عن توفير الهيكل الأساسي للموقع ومحتوياته كالعناوين والفقرات والصور، بينما تتولى CSS التنسيق و JavaScript التفاعل.',
    },
    contentMarkdown: `# ما هي لغة HTML وكيف تعمل صفحات الويب؟

أهلاً بك في أول خطوة من رحلتك لتصبح **مطور واجهات مستخدم (Frontend Developer)** محترف! 🚀

إذا كنت تعتقد أن البرمجة وتطوير المواقع أمر معقد ومخصص للعباقرة فقط، فنحن هنا لنثبت لك العكس. كل موقع تراه اليوم — من Google إلى YouTube — يبدأ بنفس اللبنة الأساسية: **HTML**.

---

### كيف تعمل صفحات الويب ببساطة؟

تخيل بناء المنزل:
1. **الهيكل العظمي والخرسانة والجدران**: هذا هو **HTML**. بدونها لا يوجد بيت أصلاً!
2. **الدهانات، الديكورات، الألوان وتنسيق الأثاث**: هذا هو **CSS**.
3. **شبكة الكهرباء، الأبواب الذكية، والمصاعد التفاعلية**: هذا هو **JavaScript**.

عندما تفتح متصفحك (مثل Chrome أو Firefox) وتكتب عنوان موقع:
1. يرسل المتصفح طلباً (Request) إلى جهاز خادم (Server).
2. يرد الخادم بإرسال ملف نصي بصيغة HTML.
3. يقوم المتصفح بقراءة هذا الملف سطراً بسطر وترجمته إلى الواجهة الجميلة التي تراها أمامك.

---

### ما معنى اختصار HTML؟

يرمز الاختصار إلى:
- **H**yper**T**ext: النص الفائق، أي النصوص التي يمكنك النقر عليها لتنقلك إلى صفحات ومواقع أخرى (الروابط).
- **M**arkup **L**anguage: لغة ترميزية دلالية؛ وليست لغة برمجة حسابية أو منطقية. وظيفتها وسم المحتوى (تحديد: "هذا عنوان"، "هذه فقرة"، "هذه صورة").

---

### الوسوم (Tags) في HTML

تستخدم لغة HTML ما يسمى **الوسوم (Tags)** المحاطة بأقواس زاوية \`< >\`.
معظم الوسوم تتكون من جزأين:
- **وسم البداية (Opening Tag)**: \`<h1>\`
- **المحتوى الداخلي**: النص الفعلي
- **وسم النهاية (Closing Tag)**: \`</h1>\` (لاحظ علامة السلاش \`/\`)

\`\`\`html
<h1>هذا عنوان رئيسي كبير</h1>
<p>هذه فقرة نصية عادية توضح فكرة الدرس.</p>
\`\`\`

> 💡 **نصيحة للمبتدئين:** 
> لا تقلق بشأن حفظ كل الوسوم من اليوم الأول! المهم هو فهم المبدأ: المتصفح يحتاج إشعاراً منك ليعرف نوع كل قطعة محتوى.

في الدرس القادم، سنتعلم كيف نكتب ملف HTML كامل من الصفر ونشرح كل سطر فيه بالتفصيل!`,
  },

  // ----------------------------------------------------
  // HTML Lesson 2: html-document-structure
  // ----------------------------------------------------
  {
    slug: 'html-document-structure',
    courseSlug: 'html-fundamentals',
    moduleSlug: 'html-intro-module',
    order: 2,
    title: 'الهيكل العظمي لصفحة HTML والوسوم الأساسية',
    readTimeMinutes: 8,
    summary: 'تشريح وسم <!DOCTYPE html>، الرأس head والجسم body، مع وسوم النصوص والعناوين والفقرات.',
    interactiveExercise: {
      instructions: 'أضف عنواناً فرعياً باستخدام الوسم `<h2>` وفقرة إضافية تصف هوايتك البرمجية داخل وسم `<body>`.',
      initialHtml: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <title>صفحتي الشخصية</title>
  </head>
  <body>
    <h1>أهلاً بالعالم!</h1>
    <!-- أضف كودك هنا -->
  </body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <title>صفحتي الشخصية</title>
  </head>
  <body>
    <h1>أهلاً بالعالم!</h1>
    <h2>هوايتي المفضلة: تعلم الويب</h2>
    <p>أقضي وقت فراغي في كتابة وسوم HTML وتجربة تصاميم جديدة.</p>
  </body>
</html>`,
    },
    quiz: {
      question: 'أين يتم وضع المحتوى الذي يراه الزائر فعلياً داخل شاشة المتصفح؟',
      options: [
        'داخل وسم <head>',
        'داخل وسم <body>',
        'داخل وسم <title>',
        'قبل وسم <!DOCTYPE html>',
      ],
      correctIndex: 1,
      explanation: 'وسم <body> هو الحاوية الوحيدة لجميع العناصر المرئية للمستخدم في الصفحة. أما وسم <head> فيحتوي على بيانات وصفية (Metadata) موجهة للمتصفح ومحركات البحث.',
    },
    contentMarkdown: `# الهيكل العظمي لصفحة HTML

لكي يفهم المتصفح أي صفحة ويب دون أخطاء، يجب أن نتبع هيكلاً معيارياً ثابتاً يسمى **HTML Boilerplate**.

---

### الهيكل الأساسي الكامل

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>عنوان موقعي الأول</title>
  </head>
  <body>
    <h1>مرحباً بكم في موقعي!</h1>
    <p>هذا النص يظهر داخل الصفحة لكل الزوار.</p>
  </body>
</html>
\`\`\`

---

### تشريح الأسطر سطراً بسطر:

1. **\`<!DOCTYPE html>\`**:
   يخبر المتصفح أن الصفحة تستخدم أحدث معيار وهو **HTML5**.
2. **\`<html lang="ar" dir="rtl">\`**:
   الجذر الأساسي للصفحة. نحدد هنا أن اللغة هي العربية (\`ar\`) واتجاه القراءة من اليمين لليسار (\`rtl\`).
3. **\`<head>\`**:
   رأس الصفحة، لا يظهر محتواه للزائر مباشرة، بل يضم إعدادات الصفحة:
   - \`<meta charset="UTF-8">\`: يدعم كل اللغات والحروف العربية دون تشويه أو رموز غريبة.
   - \`<meta name="viewport" ...>\`: يجعل الصفحة متجاوبة مع شاشات الهواتف المحمولة.
   - \`<title>\`: النص الذي يظهر في شريط التبويب أعلى المتصفح.
4. **\`<body>\`**:
   جسم الصفحة! أي شيء تضعه هنا هو ما يراه الزائر فعلياً.

---

### وسوم العناوين والفقرات (Headings & Paragraphs)

توفر HTML ستة مستويات للعناوين من الأكبر للأصغر:
\`\`\`html
<h1>عنوان رئيسي أول (الأكبر والأهم)</h1>
<h2>عنوان فرعي ثانٍ</h2>
<h3>عنوان فرعي ثالث</h3>
<h4>عنوان رابع</h4>
<h5>عنوان خامس</h5>
<h6>عنوان سادس (الأصغر)</h6>
\`\`\`

أما الفقرات فتستخدم الوسم \`<p>\`:
\`\`\`html
<p>هذه فقرة عادية. يمكنك كتابة عدة أسطر داخلها بكل راحة.</p>
\`\`\`

> ⚠️ **ملاحظة مهمة:**
> ينصح المعيار دائماً بوجود وسم \`<h1>\` واحد فقط في الصفحة ليمثل الموضوع الرئيسي للمقال، مما يساعد محركات البحث في فهم صفحتك بدقة.`,
  },

  // ----------------------------------------------------
  // HTML Lesson 3: html-attributes-links-images
  // ----------------------------------------------------
  {
    slug: 'html-attributes-links-images',
    courseSlug: 'html-fundamentals',
    moduleSlug: 'html-intro-module',
    order: 3,
    title: 'الخصائص (Attributes) والروابط والصور',
    readTimeMinutes: 7,
    summary: 'إضافة الصور بروابطها والنصوص البديلة alt، وإنشاء الروابط التشعبية وفتح الصفحات في نوافذ جديدة.',
    interactiveExercise: {
      instructions: 'أنشئ رابطاً يوجه إلى Google يفتح في علامة تبويب جديدة مستخدماً الخاصية `target="_blank"`.',
      initialHtml: `<!-- أنشئ الرابط هنا -->
<a href="https://google.com">ابحث في جوجل</a>`,
      solution: `<a href="https://google.com" target="_blank" rel="noopener noreferrer">ابحث في جوجل</a>`,
    },
    quiz: {
      question: 'لماذا تعتبر الخاصية alt في وسم الصورة <img> ضرورية جداً؟',
      options: [
        'لأنها تزيد من سرعة تحميل الصورة',
        'لعرض نص بديل إذا فشلت الصورة في التحميل، ومساعدة ذوي الإعاقة البصرية ومحركات البحث',
        'لتحديد دقة ووضوح ألوان الصورة',
        'لتغيير أبعاد الصورة تلقائياً',
      ],
      correctIndex: 1,
      explanation: 'الخاصية alt توفر وصفاً نصياً للمحتوى البصري. تفيد قارئات الشاشة (Screen Readers) لذوي الهمم ومحركات بحث Google في فهرسة الصور.',
    },
    contentMarkdown: `# الخصائص (Attributes) والروابط والصور

صفحات الويب ليست مجرد نصوص جامدة؛ قوتها الحقيقية تكمن في القدرة على ربط الصفحات ببعضها وتضمين الصور والوسائط المتعددة.

---

### ما هي الخصائص (Attributes)؟

الخصائص هي معلومات إضافية نمررها داخل وسم البداية للتحكم في سلوكه أو مظهره.
تُكتب دائماً بصيغة:
\`\`\`html
<tag name="value">المحتوى</tag>
\`\`\`

---

### 1. الروابط التشعبية (Links)

نستخدم وسم المرساة \`<a>\` (Anchor) لإنشاء الروابط:
\`\`\`html
<!-- رابط لموقع خارجي -->
<a href="https://example.com" target="_blank">زيارة الموقع</a>

<!-- رابط لصفحة أخرى داخل مشروعك -->
<a href="/about.html">من نحن</a>
\`\`\`

- **\`href\`**: مسار الوجهة (URL).
- **\`target="_blank"\`**: يفتح الرابط في نافذة أو تبويب جديد بدلاً من إغلاق صفحتك.

---

### 2. وسم الصور (Images)

وسم الصورة \`<img>\` هو وسم **ذاتي الإغلاق (Self-closing)** لا يحتوي على وسم نهاية منفصل:

\`\`\`html
<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" 
     alt="كمبيوتر محمول مفتوح على طاولة عمل برمجية" 
     width="500" 
     height="300" />
\`\`\`

- **\`src\`**: مصدر الصورة ورابطها.
- **\`alt\`**: النص البديل الذي يظهر إذا انقطع الاتصال أو لقراء الشاشة.`,
  },

  // ----------------------------------------------------
  // HTML Lesson 4: html-forms-and-inputs
  // ----------------------------------------------------
  {
    slug: 'html-forms-and-inputs',
    courseSlug: 'html-fundamentals',
    moduleSlug: 'html-forms-semantic-module',
    order: 4,
    title: 'نماذج الإدخال (Forms & Inputs) والتحقق الأولي',
    readTimeMinutes: 9,
    summary: 'كيف تصنع استمارة تسجيل كاملة مع حقول النصوص، كلمات المرور، الأزرار، والتحقق المدمج.',
    interactiveExercise: {
      instructions: 'أنشئ استمارة نموذج تتضمن حقلاً للبريد الإلكتروني وحقلاً لكلمة المرور وزراً للإرسال.',
      initialHtml: `<form>
  <!-- أضف حقول الإدخال هنا -->
</form>`,
      solution: `<form>
  <label for="user-email">البريد الإلكتروني:</label>
  <input type="email" id="user-email" required placeholder="name@example.com" />
  
  <label for="user-pass">كلمة المرور:</label>
  <input type="password" id="user-pass" required />
  
  <button type="submit">تسجيل الدخول</button>
</form>`,
    },
    quiz: {
      question: 'أي نوع من حقول <input> يقوم بإخفاء الحروف بنقاط أو نجوم لحماية السرية؟',
      options: ['type="text"', 'type="password"', 'type="hidden"', 'type="email"'],
      correctIndex: 1,
      explanation: 'النوع type="password" يخفي الحروف المدخلة تلقائياً برمز نقطي لحماية الخصوصية.',
    },
    contentMarkdown: `# نماذج الإدخال (Forms & Inputs)

تعد النماذج (Forms) شريان التفاعل على الويب؛ فمن خلالها يسجل المستخدم حسابه، يرسل رسالة، أو يشتري منتجاً.

---

### هيكل النموذج الأساسي

\`\`\`html
<form action="/api/login" method="POST">
  <div>
    <label for="email">البريد الإلكتروني:</label>
    <input type="email" id="email" name="email" required placeholder="name@example.com" />
  </div>

  <div>
    <label for="password">كلمة المرور:</label>
    <input type="password" id="password" name="password" required minlength="8" />
  </div>

  <button type="submit">دخول</button>
</form>
\`\`\`

---

### أشهر أنواع حقول \`<input>\`:
- \`type="text"\`: نص عام قصير.
- \`type="email"\`: يتحقق تلقائياً من وجود علامة @ وصيغة البريد.
- \`type="password"\`: يخفي الأحرف المدخلة.
- \`type="number"\`: للأرقام والكميات.
- \`type="checkbox"\`: مربعات الاختيار المتعدد.
- \`type="radio"\`: اختيار خيار واحد فقط من مجموعة.

> 💡 **أفضل ممارسة:**
> اربط دائماً كل وسم \`<label>\` بحقله الخاص عن طريق مطابقة خاصية \`for\` في الـ label مع خاصية \`id\` في الـ input. هذا يتيح للمستخدم النقر على النص للتركيز على الحقل فوراً.`,
  },

  // ----------------------------------------------------
  // HTML Lesson 5: semantic-html-and-seo
  // ----------------------------------------------------
  {
    slug: 'semantic-html-and-seo',
    courseSlug: 'html-fundamentals',
    moduleSlug: 'html-forms-semantic-module',
    order: 5,
    title: 'الـ Semantic HTML: لماذا تهم محركات البحث وقراء الشاشة؟',
    readTimeMinutes: 7,
    summary: 'الفرق بين div ووسوم header, nav, main, article, section, footer وكتابة كود نظيف وقابل للوصول.',
    interactiveExercise: {
      instructions: 'استبدل وسوم الـ div العامة بوسوم دلالية نظيفة مثل header, nav, main, footer.',
      initialHtml: `<div class="top-bar">
  <div class="menu">القائمة</div>
</div>
<div class="content">المحتوى الرئيسي</div>
<div class="bottom-bar">جميع الحقوق محفوظة</div>`,
      solution: `<header>
  <nav>القائمة</nav>
</header>
<main>المحتوى الرئيسي</main>
<footer>جميع الحقوق محفوظة</footer>`,
    },
    quiz: {
      question: 'أي وسم دلالي يفضل استخدامه لشريط الروابط والتنقل الرئيسي في الموقع؟',
      options: ['<section>', '<nav>', '<aside>', '<menu-bar>'],
      correctIndex: 1,
      explanation: 'وسم <nav> (Navigation) مخصص قياسياً من معايير W3C لتمثيل كتل الروابط والتنقل الرئيسية.',
    },
    contentMarkdown: `# الـ Semantic HTML (الوسوم الدلالية)

في البدايات القديمة للويب، كان المطورون يكتبون مئات من وسوم \`<div>\` المتداخلة لكل شيء. هذا كان يسمى "Div Soup" وصعّب جداً فهم الكود وصيانته.

مع HTML5، ظهرت **الوسوم الدلالية (Semantic Tags)** التي تشرح محتواها ومعناها بوضوح للبشر ولأجهزة الحاسوب.

---

### خريطة الصفحة الدلالية النموذجية:

\`\`\`html
<body>
  <!-- ترويسة الموقع الرئيسية -->
  <header>
    <h1>شعار الموقع</h1>
    <!-- روابط التنقل -->
    <nav>
      <ul>
        <li><a href="/">الرئيسية</a></li>
        <li><a href="/courses">المسارات</a></li>
      </ul>
    </nav>
  </header>

  <!-- المحتوى الرئيسي الحصري لهذه الصفحة -->
  <main>
    <article>
      <h2>عنوان المقال</h2>
      <p>تفاصيل المقال وشرح الدرس...</p>
    </article>

    <aside>
      <h3>روابط مقترحة ذات صلة</h3>
    </aside>
  </main>

  <!-- تذييل الصفحة -->
  <footer>
    <p>© 2026 Code Academy - جميع الحقوق محفوظة.</p>
  </footer>
</body>
\`\`\`

---

### الفوائد المباشرة:
1. **تحسين محركات البحث (SEO)**: محركات البحث تفهم أين العنوان الرئيسي وأين المحتوى الحقيقي.
2. **إمكانية الوصول (Accessibility - A11y)**: يستطيع المكفوفون وضعاف البصر التنقل بسرعة بين الأقسام.
3. **نظافة الكود وسهولة صيانته**: قراءة الكود تصبح واضحة وسريعة لأي مبرمج في فريقك.`,
  },

  // ----------------------------------------------------
  // CSS Lesson 1: css-selectors-and-cascade
  // ----------------------------------------------------
  {
    slug: 'css-selectors-and-cascade',
    courseSlug: 'css-fundamentals',
    moduleSlug: 'css-box-model-module',
    order: 1,
    title: 'كيف تختار العناصر؟ المحددات (Selectors) والأولوية',
    readTimeMinutes: 7,
    summary: 'Classes و IDs وأولوية القواعد (Specificity) وكيف يرث العنصر خصائص الخطوط والألوان.',
    interactiveExercise: {
      instructions: 'اكتب كود CSS لتغيير لون النص لعنصر يمتلك كلاس `.highlight` إلى اللون الأزرق السماوي `#38bdf8`.',
      initialHtml: `<p class="highlight">هذا النص مميز ويستحق لونا رائعا!</p>`,
      initialCss: `/* اكتب كود CSS هنا */`,
      solution: `.highlight {
  color: #38bdf8;
  font-weight: bold;
}`,
    },
    quiz: {
      question: 'أي محدد له أولوية وأقوى في تطبيق التنسيق (Specificity) عند التضارب؟',
      options: ['محدد الوسم مثل p', 'محدد الكلاس مثل .card', 'محدد المعرف مثل #header', 'المحدد العام *'],
      correctIndex: 2,
      explanation: 'المعرف (#id) أقوى بكثير في درجة الأولوية (Specificity) من الكلاس (.class) ومن اسم الوسم (tag). ومع ذلك يفضل في المشاريع الحقيقية استخدام الكلاسات لمرونتها وقابليتها لإعادة الاستخدام.',
    },
    contentMarkdown: `# محددات CSS وقاعدة الشلال (Cascade)

لغة **CSS (Cascading Style Sheets)** هي الريشة السحرية التي تحول الهياكل الصامتة إلى لوحات رقمية مبهرة.

---

### كيف نربط كود CSS بـ HTML؟
أفضل طريقة هي ملف خارجي \`styles.css\` وربطه داخل \`<head>\`:
\`\`\`html
<link rel="stylesheet" href="styles.css" />
\`\`\`

---

### المحددات الثلاثة الأكثر استخداماً:

1. **محدد الوسم (Element Selector)**: يطبق على كل العناصر المشابهة.
\`\`\`css
p {
  color: #64748b;
  line-height: 1.6;
}
\`\`\`

2. **محدد الكلاس (Class Selector)**: يبدأ بنقطة \`.\` وهو الأكثر مرونة واستخداماً.
\`\`\`css
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
}
\`\`\`

3. **محدد الـ ID (ID Selector)**: يبدأ بعلامة الشباك \`#\` ويستخدم لعنصر وحيد فريد في الصفحة.
\`\`\`css
#main-navbar {
  position: sticky;
  top: 0;
}
\`\`\``,
  },

  // ----------------------------------------------------
  // CSS Lesson 2: understanding-the-box-model
  // ----------------------------------------------------
  {
    slug: 'understanding-the-box-model',
    courseSlug: 'css-fundamentals',
    moduleSlug: 'css-box-model-module',
    order: 2,
    title: 'فهم نموذج الصندوق: Margin, Border, Padding, Content',
    readTimeMinutes: 8,
    summary: 'لماذا تحدث مسافات غير متوقعة؟ والحل السحري box-sizing: border-box.',
    interactiveExercise: {
      instructions: 'أعطِ الصندوق الداخلي padding بقيمة 16px مع حافة border رمادية دائرية.',
      initialHtml: `<div class="box">أنا محتوى الصندوق!</div>`,
      initialCss: `.box {
  background: #1e293b;
  color: white;
  /* أضف التنسيق هنا */
}`,
      solution: `.box {
  background: #1e293b;
  color: white;
  padding: 16px;
  border: 2px solid #475569;
  border-radius: 8px;
}`,
    },
    quiz: {
      question: 'ما هي المساحة الفاصلة بين محتوى العنصر وبين حافته (Border)؟',
      options: ['Margin', 'Padding', 'Outline', 'Gap'],
      correctIndex: 1,
      explanation: 'الـ Padding هو الحشوة الداخلية بين المحتوى والـ Border، أما الـ Margin فهو الهامش الخارجي الذي يبعد العنصر عن جيرانه.',
    },
    contentMarkdown: `# فهم نموذج الصندوق (CSS Box Model)

في عالم الويب، كل عنصر تشاهده على الشاشة — حتى لو كان زراً دائرياً — هو في حقيقته **صندوق مستطيل**!

---

### طبقات الصندوق الأربعة (من الداخل للخارج):

1. **Content (المحتوى)**: مساحة النص أو الصورة نفسها.
2. **Padding (الحشوة الداخلية)**: المسافة الفاصلة بين المحتوى وجدار الصندوق (Border).
3. **Border (الإطار / الحافة)**: الخط المحيط بالصندوق.
4. **Margin (الهامش الخارجي)**: المسافة الفارغة التي تفصل الصندوق عن العناصر المجاورة له.

---

### القاعدة الذهبية لكل مطور: \`box-sizing: border-box\`
في السلوك القديم لـ CSS، إذا أعطيت عنصراً \`width: 200px\` ثم أضفت \`padding: 20px\`، كان العرض الإجمالي يصبح \`240px\` فيكسر تصميم الصفحة!

الحل هو وضع هذه القاعدة دائماً في أول ملف CSS:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`
هذا يجبر المتصفح على حساب الـ Padding والـ Border ضمن العرض المحدد دون زيادة غير مرغوبة.`,
  },

  // ----------------------------------------------------
  // CSS Lesson 3: flexbox-mastery-guide
  // ----------------------------------------------------
  {
    slug: 'flexbox-mastery-guide',
    courseSlug: 'css-fundamentals',
    moduleSlug: 'css-layout-responsive-module',
    order: 3,
    title: 'دليل احتراف الـ Flexbox: المحاذاة والتوزيع بسهولة',
    readTimeMinutes: 10,
    summary: 'محاور Flexbox الرئيسية والفرعية، justify-content و align-items والترتيب التلقائي للأعمدة والصفوف.',
    interactiveExercise: {
      instructions: 'اجعل الحاوية تستخدم flex وقوم بتوسيط العناصر أفقياً وعمودياً في المنتصف.',
      initialHtml: `<div class="container">
  <div class="card">1</div>
  <div class="card">2</div>
</div>`,
      initialCss: `.container {
  display: block; /* غيّر هذا إلى flex */
  height: 200px;
  background: #0f172a;
}`,
      solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 200px;
  background: #0f172a;
}`,
    },
    quiz: {
      question: 'أي خاصية في Flexbox تتحكم في محاذاة العناصر على المحور الرئيسي (Main Axis)؟',
      options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
      correctIndex: 1,
      explanation: 'خاصية justify-content توزع العناصر على المحور الأساسي (أفقياً افتراضياً)، بينما align-items تضبط المحاذاة على المحور العمودي المتقاطع.',
    },
    contentMarkdown: `# دليل احتراف الـ Flexbox

كان تصميم صفوف متناسقة وتوسيط العناصر في الماضي كابوساً للمطورين، حتى جاء **Flexbox** وغير كل شيء للأبد!

---

### لتفعيل السحر: \`display: flex\`
بمجرد كتابة \`display: flex\` على العنصر الأب (Container)، تتحول كل العناصر الأبناء داخله تلقائياً إلى عناصر مرنة تترتب بجانب بعضها في صف أنيق.

\`\`\`css
.nav-bar {
  display: flex;
  justify-content: space-between; /* توزيع المسافات بين الشعار والروابط */
  align-items: center;           /* توسيط عمودي مثالي */
  gap: 1.5rem;                   /* مسافة متساوية بين العناصر */
}
\`\`\`

---

### أهم قيم \`justify-content\` (المحور الأفقي):
- \`flex-start\`: محاذاة في البداية.
- \`center\`: توسيط في المنتصف تماماً.
- \`flex-end\`: محاذاة في النهاية.
- \`space-between\`: أول عنصر في البداية وآخر عنصر في النهاية والمسافة موزعة بينهما.
- \`space-around\`: مسافات متساوية حول كل عنصر.`,
  },

  // ----------------------------------------------------
  // CSS Lesson 4: responsive-design-media-queries
  // ----------------------------------------------------
  {
    slug: 'responsive-design-media-queries',
    courseSlug: 'css-fundamentals',
    moduleSlug: 'css-layout-responsive-module',
    order: 4,
    title: 'التصميم المتجاوب ومفهوم Mobile-First',
    readTimeMinutes: 8,
    summary: 'استخدام Media Queries لضمان ظهور موقعك بشكل فائق الجمال على الهواتف الذكية.',
    interactiveExercise: {
      instructions: 'اكتب استعلام وسائط يجعل اتجاه القائمة يتحول من عمودي (شاشات الهواتف) إلى أفقي على الشاشات الأكبر من 768px.',
      initialHtml: `<nav class="menu">
  <a href="#">الرئيسية</a>
  <a href="#">الدروس</a>
</nav>`,
      initialCss: `.menu {
  display: flex;
  flex-direction: column;
}
/* اكتب Media Query هنا */`,
      solution: `.menu {
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .menu {
    flex-direction: row;
  }
}`,
    },
    quiz: {
      question: 'ماذا يعني نهج Mobile-First في تصميم الويب؟',
      options: [
        'تصميم موقع يعمل فقط على أجهزة أبل وآيفون',
        'كتابة كود التنسيق الأساسي لشاشات الهواتف أولاً، ثم إضافة تنسيقات للشاشات الأكبر عبر min-width',
        'تجاهل مستخدمي أجهزة الكمبيوتر المكتبية نهائياً',
        'استخدام تطبيقات Native فقط بدلاً من متصفح الويب',
      ],
      correctIndex: 1,
      explanation: 'نهج Mobile-First يعني البدء بتصميم أبسط وأنظف تجربة للموبايل أولاً، ثم توسيع التخطيط تدريجياً كلما كبرت مساحة الشاشة.',
    },
    contentMarkdown: `# التصميم المتجاوب ومفهوم Mobile-First

أكثر من 65% من زيارات مواقع الإنترنت اليوم تأتي من الهواتف الذكية. موقعك الذي يبدو مذهلاً على لابتوب عريض قد يصبح غير قابل للاستخدام إطلاقاً على هاتف ما لم تصممه بطريقة **Responsive**!

---

### استعلامات الوسائط (Media Queries)
تسمح لك Media Queries بتطبيق قواعد CSS مختلفة بحسب حجم شاشة جهاز الزائر:

\`\`\`css
/* التنسيق الافتراضي للهواتف */
.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* عمود واحد فقط على الموبايل */
  gap: 1rem;
}

/* عندما تصبح الشاشة 768px أو أعرض (أجهزة التابلت والكمبيوتر) */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 أعمدة متجاورة */
  }
}
\`\`\``,
  },

  // ----------------------------------------------------
  // JS Lesson 1: js-variables-and-data-types
  // ----------------------------------------------------
  {
    slug: 'js-variables-and-data-types',
    courseSlug: 'javascript-fundamentals',
    moduleSlug: 'js-core-logic-module',
    order: 1,
    title: 'المتغيرات (let, const) وأنواع البيانات في JavaScript',
    readTimeMinutes: 8,
    summary: 'لماذا نتجنب var؟ والفرق بين الأنواع البسيطة (Primitive) والأنواع المرجعية (Reference).',
    interactiveExercise: {
      instructions: 'عرّف متغيراً ثابتاً `courseName` بقيمة "Code Academy" ومتغيراً قابلاً للتعديل `studentScore` بقيمة 95.',
      initialJs: `// اكتب الكود هنا`,
      solution: `const courseName = "Code Academy";
let studentScore = 95;
studentScore += 5;`,
    },
    quiz: {
      question: 'ما هو الفرق الأساسي بين let و const في JavaScript؟',
      options: [
        'let تستخدم للنصوص و const تستخدم للأرقام فقط',
        'const لمتغير ثابت لا يمكن إعادة إسناد قيمة جديدة له، بينما let تقبل إعادة التعيين',
        'let تعمل فقط داخل الدوال بينما const تعمل فقط خارجها',
        'لا يوجد أي فرق على الإطلاق',
      ],
      correctIndex: 1,
      explanation: 'نستخدم const للقيم الثابتة التي لن نعيد تعيينها، ونستخدم let للمتغيرات التي ستتغير قيمتها لاحقاً (مثل العدادات وحالات التحميل).',
    },
    contentMarkdown: `# المتغيرات وأنواع البيانات في JavaScript

مرحباً بك في لغة البرمجة التي تدير الإنترنت: **JavaScript**! هنا ننتقل من مجرد تنسيق الواجهات إلى بناء المنطق وحساب البيانات واتخاذ القرارات البرمجية.

---

### الإعلان عن المتغيرات الحديثة: \`let\` مقابل \`const\`

انسَ تماماً كلمة \`var\` القديمة؛ فهي مصدر مشاكل شائعة بسبب الـ Hoisting ونطاق الدوال. في JavaScript الحديثة (ES6+):

1. **\`const\` (الثوابت)**: هي خيارك الافتراضي الأول دائماً. استخدمها مع أي قيمة لا تنوي إعادة إسنادها:
\`\`\`javascript
const academyName = "Code Academy";
const maxStudents = 50;
\`\`\`

2. **\`let\` (المتغيرات)**: استخدمها فقط عندما تعلم يقيناً أن القيمة ستتغير لاحقاً:
\`\`\`javascript
let currentScore = 0;
currentScore = currentScore + 10; // مسموح تماماً
\`\`\`

---

### أنواع البيانات البدائية (Primitive Types):
- **String (النصوص)**: \`"أحمد"\` أو \`'JavaScript'\`
- **Number (الأرقام)**: \`42\` أو \`3.14\`
- **Boolean (القيم المنطقية)**: \`true\` أو \`false\`
- **Null**: يمثل غياب القيمة عمداً.
- **Undefined**: متغير تم الإعلان عنه ولكن لم يتم إعطاؤه قيمة بعد.`,
  },

  // ----------------------------------------------------
  // JS Lesson 2: js-functions-and-scope
  // ----------------------------------------------------
  {
    slug: 'js-functions-and-scope',
    courseSlug: 'javascript-fundamentals',
    moduleSlug: 'js-core-logic-module',
    order: 2,
    title: 'الدوال العادية والسهمية (Arrow Functions) ومفهوم Scope',
    readTimeMinutes: 9,
    summary: 'كتابة دوال قابلة لإعادة الاستخدام، تمرير المعاملات، والنطاق المحلي والعام.',
    interactiveExercise: {
      instructions: 'اكتب دالة سهمية (Arrow Function) باسم `calculateTotal` تأخذ `price` و `tax` وترجع حاصل جمعهما.',
      initialJs: `// عرّف الدالة هنا`,
      solution: `const calculateTotal = (price, tax) => {
  return price + tax;
};`,
    },
    quiz: {
      question: 'ما هي ميزة الدوال السهمية (Arrow Functions) في كتابة الكود؟',
      options: [
        'تزيد من سرعة المعالج خمس مرات',
        'صيغة مختصرة أنيقة ولا تعيد ربط قيمة this الخاصة بها',
        'تمنع حدوث الأخطاء النحوية إطلاقاً',
        'تسمح بتشغيل جافاسكربت بدون متصفح',
      ],
      correctIndex: 1,
      explanation: 'الدوال السهمية توفر صيغة كتابة بالغة الإيجاز والوضوح، كما ترث قيمة this المعجمية من النطاق المحيط بها.',
    },
    contentMarkdown: `# الدوال العادية والدوال السهمية (Functions)

الدالة هي كتلة كود منطقية مغلفة تقوم بمهمة محددة عند استدعائها، بدلاً من تكرار كتابة نفس الأسطر عشرات المرات.

---

### الدالة العادية (Function Declaration)
\`\`\`javascript
function greetUser(userName) {
  return \`أهلاً وسهلاً بك يا \${userName}!\`;
}

console.log(greetUser("سارة")); // أهلاً وسهلاً بك يا سارة!
\`\`\`

---

### الدالة السهمية الأنيقة (Arrow Function)
في مشاريع React والتطبيقات الحديثة، ستستخدم الدوال السهمية في 90% من الحالات:

\`\`\`javascript
const multiply = (a, b) => a * b;

console.log(multiply(4, 5)); // 20
\`\`\`
لاحظ كيف استغنينا عن الأقواس وعن كلمة \`return\` عندما يكون جسم الدالة مكوناً من سطر تعبيري واحد!`,
  },

  // ----------------------------------------------------
  // JS Lesson 3: js-arrays-and-objects-methods
  // ----------------------------------------------------
  {
    slug: 'js-arrays-and-objects-methods',
    courseSlug: 'javascript-fundamentals',
    moduleSlug: 'js-core-logic-module',
    order: 3,
    title: 'المصفوفات والكائنات ودوال المعالجة الحديثة (map, filter)',
    readTimeMinutes: 10,
    summary: 'التعامل مع قوائم البيانات كالمحترفين: map, filter, reduce، وتفكيك الكائنات Destructuring.',
    interactiveExercise: {
      instructions: 'استخدم الدالة `filter` لإنشاء مصفوفة جديدة تحتوي فقط على الأرقام الزوجية من المصفوفة `numbers`.',
      initialJs: `const numbers = [1, 2, 3, 4, 5, 6];
// اكتب كود الفلترة هنا`,
      solution: `const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(n => n % 2 === 0);`,
    },
    quiz: {
      question: 'ماذا ترجع دالة map() عند تطبيقها على مصفوفة في JavaScript؟',
      options: [
        'ترجع عنصراً واحداً فقط هو الأول',
        'ترجع مصفوفة جديدة بنفس الطول بعد تطبيق عملية التحويل على كل عنصر',
        'تقوم بحذف العناصر غير الصالحة فقط',
        'لا ترجع أي شيء وتقوم بتعديل المصفوفة الأصلية مباشرة',
      ],
      correctIndex: 1,
      explanation: 'دالة map ترجع مصفوفة جديدة تماماً دون المساس بالمصفوفة الأصلية (Immutability)، وهو المبدأ الأساسي في إدارة بيانات React.',
    },
    contentMarkdown: `# المصفوفات والكائنات (Arrays & Objects)

معظم البرامج والتطبيقات هي في جوهرها: استلام قائمة من البيانات، وتعديلها، وعرضها للمستخدم.

---

### 1. دالة التحويل: \`.map()\`
تأخذ كل عنصر في المصفوفة، وتطبق عليه دالة ترجع عنصراً جديداً:
\`\`\`javascript
const prices = [10, 20, 30];
const pricesWithTax = prices.map(price => price * 1.15);
console.log(pricesWithTax); // [11.5, 23, 34.5]
\`\`\`

---

### 2. دالة التصفية: \`.filter()\`
تستخرج فقط العناصر التي تحقق شرطاً معيناً:
\`\`\`javascript
const lessons = [
  { id: 1, title: "HTML Basics", completed: true },
  { id: 2, title: "CSS Flexbox", completed: false },
  { id: 3, title: "JavaScript Loops", completed: true }
];

const completedLessons = lessons.filter(lesson => lesson.completed);
\`\`\`

---

### 3. تفكيك الكائنات (Object Destructuring)
\`\`\`javascript
const student = { name: "عمر", level: "مبتدئ", city: "القاهرة" };

// الطريقة الحديثة:
const { name, level } = student;
console.log(name); // "عمر"
\`\`\``,
  },

  // ----------------------------------------------------
  // JS Lesson 4: dom-manipulation-and-events
  // ----------------------------------------------------
  {
    slug: 'dom-manipulation-and-events',
    courseSlug: 'javascript-fundamentals',
    moduleSlug: 'js-dom-async-module',
    order: 4,
    title: 'التحكم في الـ DOM والاستماع للأحداث (EventListeners)',
    readTimeMinutes: 9,
    summary: 'تعديل النصوص، تغيير الـ Classes، التقاط الضغط على الأزرار وإنشاء عناصر ديناميكية.',
    interactiveExercise: {
      instructions: 'أضف مستمع حدث click للزر بحيث يغير نص العنصر `result` إلى "تم النقر بنجاح!".',
      initialHtml: `<button id="btn">انقر هنا</button>
<p id="result">في انتظار النقر...</p>`,
      initialJs: `const btn = document.getElementById("btn");
const result = document.getElementById("result");
// اكتب مستمع الحدث هنا`,
      solution: `const btn = document.getElementById("btn");
const result = document.getElementById("result");
btn.addEventListener("click", () => {
  result.textContent = "تم النقر بنجاح!";
});`,
    },
    quiz: {
      question: 'ما هي الطريقة القياسية الموصى بها في JavaScript للاستماع لحدث تفاعل المستخدم مثل النقر؟',
      options: ['element.click()', 'element.addEventListener("click", callback)', 'element.attachAction("onClick")', 'window.listenToClick()'],
      correctIndex: 1,
      explanation: 'استخدام addEventListener هو الأسلوب القياسي والآمن لربط الوظائف بالأحداث دون الكتابة فوق مستمعي الأحداث الآخرين.',
    },
    contentMarkdown: `# التحكم في الـ DOM (Document Object Model)

الـ DOM هو التمثيل الشجري الذي يصنعه المتصفح لصفحة الـ HTML، وهو الجسر الذي يتيح لـ JavaScript قراءة وتعديل عناصر الصفحة على الهواء مباشرة!

---

### اختيار العناصر والتعديل عليها
\`\`\`javascript
// اختيار العنصر بواسطة الـ ID أو الكلاس
const title = document.querySelector("#page-title");

// تغيير النص الداخلي
title.textContent = "أهلاً بك في أكاديميتنا المتطورة!";

// تعديل التنسيق أو إضافة كلاس CSS
title.classList.add("text-emerald-500");
\`\`\`

---

### الاستماع لنقرات المستخدم (Events)
\`\`\`javascript
const counterBtn = document.querySelector("#counter");
let clicks = 0;

counterBtn.addEventListener("click", () => {
  clicks++;
  counterBtn.textContent = \`عدد النقرات: \${clicks}\`;
});
\`\`\``,
  },

  // ----------------------------------------------------
  // JS Lesson 5: async-await-and-fetching-apis
  // ----------------------------------------------------
  {
    slug: 'async-await-and-fetching-apis',
    courseSlug: 'javascript-fundamentals',
    moduleSlug: 'js-dom-async-module',
    order: 5,
    title: 'الـ Async/Await وجلب البيانات بـ Fetch API',
    readTimeMinutes: 10,
    summary: 'كيف تطلب بيانات من سيرفر دون تجميد المتصفح، وكيفية معالجة الأخطاء بـ try/catch.',
    interactiveExercise: {
      instructions: 'اكتب دالة غير متزامنة async لجلب قائمة المستخدمين من الـ API وتحويل الاستجابة إلى json.',
      initialJs: `async function loadUsers() {
  // اكتب كود الـ fetch هنا
}`,
      solution: `async function loadUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return users;
  } catch (error) {
    console.error("فشل الاتصال:", error);
  }
}`,
    },
    quiz: {
      question: 'لماذا نحتاج استخدام async/await في طلبات الشبكة؟',
      options: [
        'لأن المتصفح يمنع تشغيل JavaScript بدونها',
        'لانتظار وصول البيانات من الخادم دون تجميد واجهة المستخدم أثناء فترة الانتظار',
        'لتشفير البيانات وحمايتها من القرصنة تلقائياً',
        'لحذف البيانات القديمة من الذاكرة',
      ],
      correctIndex: 1,
      explanation: 'العمليات غير المتزامنة (Asynchronous) تسمح لصفحة الويب بالبقاء متجاوبة وسلسة للمستخدم أثناء إجراء طلبات تستغرق وقتاً كتحميل البيانات من الإنترنت.',
    },
    contentMarkdown: `# العمليات غير المتزامنة وطلبات الخادم (Async / Await)

في تطبيقات الويب الحقيقية، لا تملك كل البيانات محلياً؛ بل ترسل طلبات عبر الإنترنت إلى خوادم خارجية (APIs) لجلب المنتجات، الأخبار، أو بيانات حساب المستخدم.

---

### كيف نطلب البيانات بـ \`fetch\` و \`async/await\`؟

\`\`\`javascript
async function fetchArticles() {
  try {
    console.log("جارٍ جلب المقالات...");
    
    // إرسال الطلب والانتظار حتى يجيب السيرفر
    const response = await fetch("https://api.example.com/articles");
    
    if (!response.ok) {
      throw new Error("حدث خطأ أثناء جلب البيانات من الخادم!");
    }

    // استخراج محتوى JSON من الاستجابة
    const data = await response.json();
    console.log("وصلت البيانات بنجاح:", data);
    return data;
  } catch (err) {
    console.error("حدث خطأ في الاتصال:", err.message);
  }
}
\`\`\`

> 💡 **قاعدة ذهبية:**
> كلمة \`await\` لا يمكن استخدامها إلا داخل دالة مسبوقة بكلمة \`async\`. ودائماً أحِط طلبات الخوادم بكتلة \`try / catch\` لتفادي انهيار التطبيق إذا انقطع الإنترنت.`,
  },

  // ----------------------------------------------------
  // Git Lesson 1: why-git-and-first-commit
  // ----------------------------------------------------
  {
    slug: 'why-git-and-first-commit',
    courseSlug: 'git-github',
    moduleSlug: 'git-core-module',
    order: 1,
    title: 'لماذا نحتاج Git؟ وكيف تصنع الـ Commit الأول؟',
    readTimeMinutes: 7,
    summary: 'شرح مبسط لمناطق Git الثلاث: Working Directory، Staging Area، و Git Repository.',
    interactiveExercise: {
      instructions: 'اكتب الأمر البرمجي في الطرفية (Terminal) لإنشاء مستودع Git جديد ثم إضافة كل الملفات وتوثيق الحفظ.',
      initialJs: `// الأوامر النصية المطلوبة
// 1. إنشاء المستودع
// 2. إضافة التغييرات
// 3. التوثيق`,
      solution: `git init
git add .
git commit -m "feat: initial commit for the project"`,
    },
    quiz: {
      question: 'ما هي وظيفة الأمر git commit في نظام Git؟',
      options: [
        'حذف المستودع بالكامل والبدء من جديد',
        'حفظ لقطة (Snapshot) دائمة للحالة الحالية للملفات مع رسالة وصفية توضح ما تم إنجازه',
        'رفع المشروع على موقع GitHub فوراً عبر الإنترنت',
        'تثبيت مكتبات Node.js تلقائياً',
      ],
      correctIndex: 1,
      explanation: 'أمر git commit يلتقط صورة دائمة للكود في سجل التاريخ لمشروعك، حتى تتمكن دائماً من معرفة من عدل وماذا تم تعديله، والرجوع لأي نقطة تاريخية متى شئت.',
    },
    contentMarkdown: `# نظام إدارة الإصدارات Git

هل سبق لك أن حفظت ملفاً باسم:
\`project_final.zip\` ثم \`project_final_really_final.zip\` ثم \`project_final_edited_v2.zip\`؟ 😅

جميعنا مررنا بهذه المعاناة! **Git** هو الحل الجذري والاحترافي الذي اعتمده العالم بأكمله لإدارة الأكواد البرمجية.

---

### مراحل Git الثلاث:
1. **Working Directory (مساحة العمل)**: ملفاتك التي تعدلها حالياً في محرر الأكواد (VS Code).
2. **Staging Area (منطقة التجهيز)**: قائمة الملفات التي جهزتها ليتم حفظها في اللقطة القادمة عبر أمر \`git add\`.
3. **Repository (المستودع التاريخي)**: السجل النهائي المؤرشف المحفوظ عبر أمر \`git commit\`.

---

### الأوامر الأربعة التي ستستخدمها كل يوم:
\`\`\`bash
# 1. تهيئة مستودع جديد في مجلد مشروعك
git init

# 2. معرفة حالة الملفات المعدلة
git status

# 3. نقل كل الملفات المعدلة لمنطقة التجهيز
git add .

# 4. توثيق اللقطة برسالة واضحة
git commit -m "feat: build homepage hero section"
\`\`\``,
  },

  // ----------------------------------------------------
  // Git Lesson 2: git-branches-and-collaboration
  // ----------------------------------------------------
  {
    slug: 'git-branches-and-collaboration',
    courseSlug: 'git-github',
    moduleSlug: 'git-core-module',
    order: 2,
    title: 'الفروع (Branches) والدمج ورفع مشروعك على GitHub',
    readTimeMinutes: 9,
    summary: 'إنشاء فرع لميزة جديدة، حل تضارب الأكواد (Merge Conflicts)، والـ Push لمستودعك البعيد.',
    interactiveExercise: {
      instructions: 'اكتب أمر إنشاء فرع جديد باسم `feature-navbar` والانتقال إليه فوراً.',
      initialJs: `// اكتب أمر Git هنا`,
      solution: `git checkout -b feature-navbar`,
    },
    quiz: {
      question: 'لماذا نستخدم الفروع (Branches) بدلاً من العمل المباشر على فرع main؟',
      options: [
        'لأن العمل على main يستهلك باقة إنترنت أكبر',
        'لتطوير الميزات وإصلاح الأخطاء في مسار معزول بأمان دون المخاطرة بتعطيل كود الإنتاج المستقر',
        'لأن Git يرفض التعديل على main تلقائياً',
        'لحذف التعديلات القديمة بعد يومين',
      ],
      correctIndex: 1,
      explanation: 'الفروع تتيح لك ولكل أعضاء الفريق تجربة أفكار وميزات جديدة في بيئة معزولة تماماً، ثم دمجها بعد اختبارها ومراجعتها.',
    },
    contentMarkdown: `# الفروع والعمل الجماعي مع GitHub

في الشركات والفرق البرمجية، لا يلمس أحد فرع الإنتاج (\`main\`) مباشرة. بدلاً من ذلك، نستخدم **الفروع (Branches)**.

---

### العمل مع الفروع:
\`\`\`bash
# إنشاء فرع جديد والانتقال إليه في خطوة واحدة
git checkout -b feature/dark-mode

# بعد الانتهاء من العمل والـ commit، نعود للفرع الرئيسي
git checkout main

# دمج الفرع بعد التأكد من سلامته
git merge feature/dark-mode
\`\`\`

---

### رفع الكود إلى GitHub (Push):
\`\`\`bash
# ربط المستودع المحلي بمستودعك على GitHub
git remote add origin https://github.com/your-username/my-project.git

# رفع ملفاتك إلى السحابة
git push -u origin main
\`\`\`

الآن أصبح كودك متاحاً للعالم، ويمكنك مشاركته في سيرتك الذاتية أو العمل مع مبرمجين آخرين عبر الـ Pull Requests! 🎉`,
  },

  // ----------------------------------------------------
  // TypeScript Lesson 1: why-typescript-and-basic-types
  // ----------------------------------------------------
  {
    slug: 'why-typescript-and-basic-types',
    courseSlug: 'typescript',
    moduleSlug: 'ts-basics-module',
    order: 1,
    title: 'لماذا نستخدم TypeScript؟ والأنواع البدائية الأساسية',
    readTimeMinutes: 8,
    summary: 'التخلص من كابوس undefined is not a function وأنواع string, number, boolean, array, tuple.',
    interactiveExercise: {
      instructions: 'عرّف دالة `formatPrice` تأخذ `amount` كنوع رقمي `number` وترجع نصاً `string` بإضافة رمز العملة.',
      initialJs: `// اكتب الدالة بنظام TypeScript هنا`,
      solution: `function formatPrice(amount: number): string {
  return amount + " ر.س";
}`,
    },
    quiz: {
      question: 'متى تكشف TypeScript الأخطاء البرمجية الناتجة عن أنواع البيانات الخاطئة؟',
      options: [
        'بعد رفع الموقع وتشغيله على الخادم فقط',
        'أثناء كتابة الكود داخل المحرر في وقت التجميع (Compile-Time) وقبل التشغيل',
        'عندما يبلغ المستخدم عن مشكلة بالبريد',
        'لا تكتشف الأخطاء أبداً',
      ],
      correctIndex: 1,
      explanation: 'القوة العظمى لـ TypeScript هي الصيد المبكر للأخطاء في وقت كتابة الكود داخل VS Code وقبل تشغيل المتصفح، مما يوفر ساعات طويلة من التصحيح الصعب.',
    },
    contentMarkdown: `# لغة TypeScript: الأمان والإنتاجية الفائقة

تعتبر **TypeScript** طبقة ذكية فوق JavaScript تضيف إليها نظام الأنواع الساكنة (Static Types).
كل كود JavaScript صحيح هو كود TypeScript سليم، ولكن TypeScript تمنحك درع حماية يمنع أشهر أخطاء الويب!

---

### المشكلة في JavaScript العادية:
\`\`\`javascript
function calculateDiscount(price) {
  return price * 0.1;
}

calculateDiscount("مائة"); // يُرجع: NaN دون أي تحذير أثناء الكتابة!
\`\`\`

---

### الحل الحاسم مع TypeScript:
\`\`\`typescript
function calculateDiscount(price: number): number {
  return price * 0.1;
}

// محرر VS Code سيضع فوراً خطاً أحمر ويمنع التشغيل إذا كتبت نصاً!
calculateDiscount("مائة"); // ❌ خطأ: Argument of type 'string' is not assignable to 'number'
calculateDiscount(100);    // ✅ سليم تماماً
\`\`\`

---

### الأنواع الأساسية:
\`\`\`typescript
let studentName: string = "خالد";
let studentAge: number = 22;
let isEnrolled: boolean = true;
let skills: string[] = ["HTML", "CSS", "JS"];
\`\`\``,
  },

  // ----------------------------------------------------
  // TypeScript Lesson 2: ts-interfaces-and-generics
  // ----------------------------------------------------
  {
    slug: 'ts-interfaces-and-generics',
    courseSlug: 'typescript',
    moduleSlug: 'ts-basics-module',
    order: 2,
    title: 'الواجهات (Interfaces) والدوال المعممة (Generics)',
    readTimeMinutes: 9,
    summary: 'تحديد شكل كائنات البيانات، وتمرير الأنواع كمعاملات ديناميكية لإعادة استخدام الكود بأمان تام.',
    interactiveExercise: {
      instructions: 'عرّف واجهة `Student` تحتوي على `id` كرقم، `name` كنص، وحقل اختياري `avatar` كنص.',
      initialJs: `// عرّف الـ Interface هنا`,
      solution: `interface Student {
  id: number;
  name: string;
  avatar?: string;
}`,
    },
    quiz: {
      question: 'كيف نجعل خاصية معينة في Interface اختيارية (غير إجبارية التوفير) في TypeScript؟',
      options: [
        'بوضع كلمة optional قبلها',
        'بوضع علامة استفهام ? بعد اسم الخاصية',
        'بوضع علامة تعجب ! بعد اسمها',
        'بكتابة null كقيمة افتراضية لها',
      ],
      correctIndex: 1,
      explanation: 'إضافة علامة الاستفهام (?) مثل avatar?: string تخبر المحرر أن هذه الخاصية اختيارية، فقد تكون موجودة أو undefined.',
    },
    contentMarkdown: `# الواجهات (Interfaces) والـ Generics

عندما تبني تطبيقات حقيقية، تتعامل مع كائنات معقدة للبيانات: منتجات، طلبات، مستخدمين. هنا تأتي قوة **الواجهات (Interfaces)** لوضع عقد واضح لهيكل البيانات.

---

### تعريف واجهة مستخدم (Interface):
\`\`\`typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor'; // Union Type دقيق جداً
  isVerified?: boolean;          // حقل اختياري بفضل علامة الاستفهام
}

const currentUser: UserProfile = {
  id: "u_101",
  name: "ياسمين",
  email: "yasmin@example.com",
  role: "student",
};
\`\`\`

---

### الدوال المعممة (Generics):
تسمح لك بكتابة دوال ومكونات مرنة تقبل نوع البيانات كمعامل ديناميكي:
\`\`\`typescript
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirstItem([10, 20, 30]); // نوعه number تلقائياً
const firstName = getFirstItem(["أحمد", "منى"]);  // نوعه string تلقائياً
\`\`\``,
  },

  // ----------------------------------------------------
  // React Lesson 1: react-intro-components-and-jsx
  // ----------------------------------------------------
  {
    slug: 'react-intro-components-and-jsx',
    courseSlug: 'react-development',
    moduleSlug: 'react-components-module',
    order: 1,
    title: 'مقدمة في React وفلسفة المكونات و JSX',
    readTimeMinutes: 9,
    summary: 'لماذا اكتسحت React عالم الويب؟ وكيف تفكر في موقعك كمجموعة مكونات صغيرة قابلة لإعادة التدوير.',
    interactiveExercise: {
      instructions: 'أنشئ أول مكون React باسم `WelcomeCard` يعرض بطاقة ترحيبية بالاسم.',
      initialJs: `// أنشئ المكون هنا`,
      solution: `function WelcomeCard() {
  return (
    <div className="card">
      <h2>أهلاً بك في عالم React!</h2>
      <p>المكونات تجعل بناء الواجهات ممتعاً ومنظماً.</p>
    </div>
  );
}`,
    },
    quiz: {
      question: 'ما هي لغة JSX المستخدمة داخل مكتبة React؟',
      options: [
        'لغة برمجة جديدة كلياً بديلة لـ JavaScript',
        'صيغة امتداد لـ JavaScript تسمح بكتابة وسوم تشبه HTML مباشرة داخل كود JS',
        'مكتبة خاصة بقواعد البيانات فقط',
        'أداة لقياس سرعة الإنترنت',
      ],
      correctIndex: 1,
      explanation: 'الـ JSX هو JavaScript XML يدمج بنية الواجهة ومنطق البرمجة في مكان واحد متناغم ومريح للتطوير.',
    },
    contentMarkdown: `# مقدمة في عالم React ⚛️

مرحباً بك في المحطة الأكثر إثارة في مسار الفرونت إند! مكتبة **React** التي طورتها شركة Meta هي المكتبة الأكثر طلباً في سوق العمل لبناء تطبيقات الويب التفاعلية.

---

### الفلسفة: فكّر بالمكونات (Components)
بدلاً من كتابة صفحة HTML عملاقة من 2000 سطر، تُقسم React الصفحة إلى **قطع ليغو مستقلة** تسمى المكونات:
- مكون لشريط التنقل \`<Navbar />\`
- مكون لبطاقة المقال \`<ArticleCard />\`
- مكون لأزرار التفاعل \`<Button />\`

يمكنك استخدام المكون الواحد عشرات المرات في أماكن مختلفة وتحديثه من مكان واحد!

---

### ما هو الـ JSX؟
\`\`\`jsx
function AcademyHeader() {
  const currentYear = new Date().getFullYear();
  
  return (
    <header className="header-box">
      <h1 className="title">منصة كود أكاديمي</h1>
      <p>عام {currentYear} هو عامك لتصبح مبرمج ويب!</p>
    </header>
  );
}
\`\`\`
لاحظ كيف نضع كود الـ HTML داخل جملة \`return\` ونضع المتغيرات والتعبيرات البرمجية بين أقواس معقوفة \`{ ... }\` بكل بساطة وسلاسة!`,
  },

  // ----------------------------------------------------
  // React Lesson 2: react-props-and-usestate
  // ----------------------------------------------------
  {
    slug: 'react-props-and-usestate',
    courseSlug: 'react-development',
    moduleSlug: 'react-components-module',
    order: 2,
    title: 'تمرير البيانات بـ Props وإدارة الحالة بـ useState',
    readTimeMinutes: 10,
    summary: 'جعل المكون حياً يستجيب لتفاعل المستخدم ويحتفظ ببياناته الداخلية.',
    interactiveExercise: {
      instructions: 'أكمل بناء عداد بسيط باستخدام Hook الـ `useState` في React لزيادة الرقم عند النقر على الزر.',
      initialJs: `import { useState } from 'react';

function Counter() {
  // عرّف الـ state هنا
  return (
    <button>العدد: 0</button>
  );
}`,
      solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      العدد: {count}
    </button>
  );
}`,
    },
    quiz: {
      question: 'ماذا يحدث لشاشة المستخدم عندما نقوم بتحديث قيمة الحالة (State) عن طريق دالة التحديث؟',
      options: [
        'يتم إعادة تحميل المتصفح بالكامل (Page Reload)',
        'تقوم React تلقائياً بإعادة رسم المكون (Re-render) في الـ DOM لتحديث البيانات المعروضة فقط',
        'تتوقف الصفحة عن الاستجابة',
        'يتم مسح قاعدة البيانات',
      ],
      correctIndex: 1,
      explanation: 'React تراقب تغيرات الـ State بدقة متناهية، وتقوم بتحديث الأجزاء المتأثرة فقط في الشاشة بسرعة فائقة دون إعادة تحميل الصفحة.',
    },
    contentMarkdown: `# الـ Props وحالة المكون (useState)

---

### 1. الـ Props: تمرير البيانات من الأب إلى الابن
تماماً كما تأخذ الدوال معاملات (Arguments)، تأخذ مكونات React خصائص تسمى **Props**:

\`\`\`jsx
interface CourseCardProps {
  title: string;
  hours: number;
}

function CourseCard({ title, hours }: CourseCardProps) {
  return (
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      <p>المدة التقديرية: {hours} ساعات</p>
    </div>
  );
}

// الاستخدام:
<CourseCard title="أساسيات HTML" hours={6} />
<CourseCard title="أساسيات CSS" hours={8} />
\`\`\`

---

### 2. الـ useState: ذاكرة المكون الحية
الـ State هي البيانات التي تتغير مع الوقت وتفاعل المستخدم:
\`\`\`jsx
import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? "❤️ معجب" : "🤍 إعجاب"} ({likes})
    </button>
  );
}
\`\`\``,
  },

  // ----------------------------------------------------
  // React Lesson 3: react-useeffect-and-lifecycle
  // ----------------------------------------------------
  {
    slug: 'react-useeffect-and-lifecycle',
    courseSlug: 'react-development',
    moduleSlug: 'react-components-module',
    order: 3,
    title: 'التأثيرات الجانبية بـ useEffect وجلب البيانات من الـ API',
    readTimeMinutes: 10,
    summary: 'الاتصال بالخوادم، مؤشرات التحميل Loading، ومزامنة المكون مع العالم الخارجي.',
    interactiveExercise: {
      instructions: 'اكتب خطاف `useEffect` مع مصفوفة تبعيات فارغة `[]` لجلب بيانات الدروس مرة واحدة فقط عند تركيب المكون.',
      initialJs: `import { useEffect, useState } from 'react';

function LessonsList() {
  const [lessons, setLessons] = useState([]);
  // اكتب الـ useEffect هنا
  return <div>قائمة الدروس</div>;
}`,
      solution: `import { useEffect, useState } from 'react';

function LessonsList() {
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    fetch('/api/lessons')
      .then(res => res.json())
      .then(data => setLessons(data));
  }, []);
  return <div>عدد الدروس: {lessons.length}</div>;
}`,
    },
    quiz: {
      question: 'ما معنى تمرير مصفوفة تبعيات فارغة [] كوسيط ثانٍ لـ useEffect؟',
      options: [
        'تشغيل التأثير عند كل حركة ماوس في الشاشة',
        'تشغيل كود التأثير مرة واحدة فقط عند ظهور المكون (Mount) على الشاشة',
        'إلغاء تشغيل التأثير نهائياً',
        'إعادة تشغيله كل ثانية باستمرار',
      ],
      correctIndex: 1,
      explanation: 'المصفوفة الفارغة [] تعني أن هذا التأثير لا يعتمد على أي متغيرات متغيرة، وبالتالي سينفذ لمرة واحدة فقط عند إنشاء المكون وتركيبه على الشاشة.',
    },
    contentMarkdown: `# التأثيرات الجانبية بـ useEffect

عندما يحتاج المكون للتواصل مع العالم الخارجي — كجلب بيانات من خادم API، الاستماع لمؤقت زمني، أو تغيير عنوان الصفحة — نستخدم الخطاف الشهير **\`useEffect\`**.

---

### تركيب الـ useEffect:
\`\`\`jsx
useEffect(() => {
  // 1. الكود الذي سينفذ (Side Effect)
  
  return () => {
    // 2. دالة التنظيف الاختيارية (Cleanup) عند إزالة المكون
  };
}, [/* 3. مصفوفة التبعيات Dependencies */]);
\`\`\`

---

### مثال عملي واقعي لجلب الدروس:
\`\`\`jsx
function CoursesFeed() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []); // [] = تشغيل مرة واحدة فقط عند فتح الصفحة

  if (loading) return <p>جارٍ تحميل الكورسات...</p>;

  return (
    <div>
      {courses.map(course => (
        <h4 key={course.slug}>{course.title}</h4>
      ))}
    </div>
  );
}
\`\`\``,
  },

  // ----------------------------------------------------
  // React Lesson 4: react-router-spa-navigation
  // ----------------------------------------------------
  {
    slug: 'react-router-spa-navigation',
    courseSlug: 'react-development',
    moduleSlug: 'react-routing-ecosystem-module',
    order: 4,
    title: 'التنقل في تطبيقات الصفحة الواحدة باستخدام React Router',
    readTimeMinutes: 9,
    summary: 'إعداد الروابط، المسارات المتداخلة، ومعاملات الرابط URL Params بدون إعادة تحميل الصفحة.',
    interactiveExercise: {
      instructions: 'استخدم مكون `Link` من `react-router-dom` لإنشاء رابط ينتقل إلى المسار `/courses` دون وميض إعادة التحميل.',
      initialJs: `// اكتب رابط التنقل هنا`,
      solution: `<Link to="/courses" className="nav-link">
  استكشف المسارات التعليمية
</Link>`,
    },
    quiz: {
      question: 'لماذا نستخدم مكون <Link to="..."> في React Router بدلاً من وسم <a href="..."> العادي؟',
      options: [
        'لأنه يغير ألوان الرابط لألوان أكثر جاذبية',
        'لمنع إعادة تحميل الصفحة بالكامل والحفاظ على حالة التطبيق وسرعته كتطبيق صفحة واحدة (SPA)',
        'لأن المتصفحات الحديثة حظرت وسم <a>',
        'لإرسال إشعار لقاعدة البيانات عند النقر',
      ],
      correctIndex: 1,
      explanation: 'وسم <a> العادي يجبر المتصفح على طلب صفحة كاملة جديدة من السيرفر، بينما <Link> يقوم بتحديث مسار الرابط وعرض المكون المناسب فوراً داخل الذاكرة دون أي وميض.',
    },
    contentMarkdown: `# التوجيه والتنقل مع React Router

في المواقع التقليدية القديمة، كل نقرة على رابط كانت تعيد طلب الصفحة من الصفر. في تطبيقات الويب الحديثة أحادية الصفحة (**Single Page Applications - SPAs**)، نحافظ على تجربة تطبيق سريعة وفورية بدون أي وميض أو إعادة تحميل!

---

### تثبيت واستخدام React Router
نستخدم مكتبة \`react-router-dom\` لتعريف مسارات التطبيق:

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* استخدم Link دائماً لمنع الـ Page Reload */}
        <Link to="/">الرئيسية</Link>
        <Link to="/paths">المسارات</Link>
        <Link to="/dashboard">لوحة تقدمي</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paths" element={<PathsPage />} />
        {/* مسار ديناميكي يحتوي على باراميتر slug */}
        <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonReaderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

---

### استخراج الباراميترات بـ \`useParams\`
\`\`\`jsx
import { useParams } from 'react-router-dom';

function LessonReaderPage() {
  const { courseSlug, lessonSlug } = useParams();
  
  return (
    <div>
      <p>أنت تدرس حالياً الكورس: {courseSlug}</p>
      <p>معرف الدرس: {lessonSlug}</p>
    </div>
  );
}
\`\`\`

تهانينا! 🎉 لقد أتممت قراءة وتطبيق جميع مبادئ مسار الفرونت إند، وأصبحت جاهزاً تماماً للغوص في التطبيقات العملية والبرمجة المستمرة!`,
  },
];

