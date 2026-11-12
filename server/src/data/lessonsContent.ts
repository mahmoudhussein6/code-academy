import { ILesson, IInteractiveExercise, IQuiz } from '../types';

const getHtmlModuleSlug = (order: number): string => {
  if (order <= 11) return 'html-intro-module';
  if (order <= 16) return 'html-resources-module';
  if (order <= 30) return 'html-forms-media-module';
  return 'html-advanced-module';
};

const createHtmlLesson = (
  order: number,
  slug: string,
  title: string,
  summary: string,
  contentMarkdown: string
): ILesson => ({
  slug,
  courseSlug: 'html-fundamentals',
  moduleSlug: getHtmlModuleSlug(order),
  order,
  title,
  summary,
  readTimeMinutes: 5,
  quiz: createTopicQuiz('html-fundamentals', title, summary, order),
  contentMarkdown,
});

const getCssModuleSlug = (order: number): string =>
  `css-module-${Math.ceil(order / 8)}`;

const createTopicQuiz = (
  courseSlug: string,
  title: string,
  summary: string,
  order: number
) => {
  const distractors =
    courseSlug === 'css-fundamentals'
      ? [
          'بناء بنية الصفحة باستخدام عناصر HTML.',
          'إضافة التفاعل والمنطق باستخدام JavaScript.',
          'إدارة قواعد البيانات والطلبات على الخادم.',
        ]
      : [
          'تنسيق الألوان والتخطيط باستخدام CSS.',
          'إضافة التفاعل والسلوك الديناميكي باستخدام JavaScript.',
          'تنفيذ عمليات الخادم وقواعد البيانات.',
        ];
  const correctIndex = (order - 1) % (distractors.length + 1);
  const options = [...distractors];
  options.splice(correctIndex, 0, summary);

  return {
    question: `ما الهدف الأساسي من درس "${title}"؟`,
    options,
    correctIndex,
    explanation: `يركز الدرس على ${summary}`,
  };
};

const createTopicExercise = (
  courseSlug: string,
  title: string,
  summary: string,
  slug: string,
  contentMarkdown: string
): IInteractiveExercise => {
  const language = courseSlug === 'css-fundamentals' ? 'css' : 'html';
  const codeSample = contentMarkdown.match(
    new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)\`\`\``, 'i')
  )?.[1]?.trim();

  if (!codeSample) {
    return courseSlug === 'css-fundamentals'
      ? {
          instructions: `طبّق ${title} على المثال المرتبط بموضوع الدرس، ثم شغّل المعاينة ولاحظ النتيجة.`,
          initialHtml: `<div class="lesson-${slug.replace(/[^a-z0-9-]/gi, '-')}">${title}</div>`,
          initialCss: `/* ابدأ بكتابة قواعد ${title} هنا */`,
        }
      : {
          instructions: `عدّل مثال ${title} وطبّق المفهوم الوارد في الدرس، ثم شغّل المعاينة.`,
          initialHtml: `<section>\n  <h2>${title}</h2>\n  <p>عدّل هذا المثال لتطبيق ${summary}</p>\n</section>`,
        };
  }

  if (courseSlug === 'css-fundamentals') {
    const classNames = [...new Set(codeSample.match(/\.([a-zA-Z_][\w-]*)/g) ?? [])]
      .map((className) => className.slice(1))
      .filter((className) => !['5', '75'].includes(className));
    const idNames = [
      ...new Set(codeSample.match(/(?:^|})\s*#([a-zA-Z_][\w-]*)/gm) ?? []),
    ]
      .map((idName) => idName.replace(/^[}\s#]+/, ''));
    const demoMarkup = [
      '<main class="demo">',
      '<h1>معاينة مثال الدرس</h1>',
      '<p>عدّل قواعد CSS ولاحظ أثرها على العناصر.</p>',
      ...classNames.map((className) => `<div class="${className}">.${className}</div>`),
      ...idNames.map((idName) => `<div id="${idName}">#${idName}</div>`),
      '<button type="button">زر تجريبي</button>',
      '</main>',
    ].join('\n');

    return {
      instructions: `طبّق ${title} على عناصر المعاينة. اكتب قواعد CSS بنفسك وشغّل المعاينة لملاحظة أثرها.`,
      initialHtml: demoMarkup,
      initialCss: `/* اكتب قواعد ${title} هنا */`,
    };
  }

  return {
    instructions: `أنشئ مثال HTML يطبق ${title}. استخدم الفكرة والوسوم التي تعلمتها في الدرس، ثم شغّل المعاينة.`,
    initialHtml: `<main>\n  <!-- اكتب هنا تطبيقك العملي لموضوع: ${title} -->\n</main>`,
  };
};

const createCssLesson = (
  order: number,
  slug: string,
  title: string,
  summary: string,
  contentMarkdown: string
): ILesson => ({
  slug,
  courseSlug: 'css-fundamentals',
  moduleSlug: getCssModuleSlug(order),
  order,
  title,
  summary,
  readTimeMinutes: 5,
  quiz: createTopicQuiz('css-fundamentals', title, summary, order),
  contentMarkdown,
});

const getJavaScriptModuleSlug = (order: number): string => {
  if (order === 1) return 'js-intro-module';
  if (order <= 3) return 'js-core-logic-module';
  if (order <= 5) return 'js-data-structures-module';
  if (order === 6) return 'js-dom-module';
  if (order <= 8) return 'js-async-errors-module';
  return 'js-modern-practices-module';
};

const createJavaScriptLesson = (
  order: number,
  slug: string,
  title: string,
  summary: string,
  contentMarkdown: string,
  interactiveExercise: IInteractiveExercise,
  quiz: IQuiz
): ILesson => ({
  slug,
  courseSlug: 'javascript-fundamentals',
  moduleSlug: getJavaScriptModuleSlug(order),
  order,
  title,
  summary,
  readTimeMinutes: 8,
  interactiveExercise,
  quiz,
  contentMarkdown,
});

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
    order: 6,
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
    moduleSlug: 'html-forms-media-module',
    order: 17,
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
    moduleSlug: 'html-forms-media-module',
    order: 20,
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

  createHtmlLesson(
    3,
    'html-headings',
    'Headings (العناوين)',
    'استخدم مستويات العناوين الستة لبناء تسلسل واضح ومنطقي لمحتوى الصفحة.',
    `# العناوين في HTML

توفّر HTML ستة مستويات من العناوين، من \`<h1>\` إلى \`<h6>\`. اختر الوسم بحسب مستوى القسم في المحتوى، لا بحسب حجمه المرئي؛ يمكن تغيير الشكل لاحقاً باستخدام CSS.

\`\`\`html
<h1>دليل النباتات المنزلية</h1>
<p>مقدمة قصيرة عن العناية بالنباتات.</p>
<h2>اختيار المكان</h2>
<h3>كمية الضوء</h3>
<p>تختلف حاجة النباتات إلى الضوء.</p>
\`\`\`

حافظ على تسلسل هرمي مفهوم، ولا تتخطَّ المستويات لمجرد الحصول على حجم خط معين. غالباً يكون للصفحة عنوان رئيسي واحد واضح، وتندرج تحته عناوين الأقسام.`,
  ),
  createHtmlLesson(
    4,
    'html-paragraphs',
    'Paragraphs (الفقرات)',
    'أنشئ فقرات نصية مفهومة، وافهم كيف يعالج المتصفح المسافات والأسطر.',
    `# الفقرات والمسافات

يمثل الوسم \`<p>\` فقرة نصية. استخدم فقرة مستقلة لكل فكرة أو وحدة نصية، بدلاً من الاعتماد على أسطر طويلة أو مسافات يدوية.

\`\`\`html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
\`\`\`

المسافات والأسطر المتكررة في مصدر HTML تُختصر عادةً إلى مسافة واحدة عند العرض. استخدم وسوماً مناسبة مثل \`<p>\` أو CSS للتحكم بالتخطيط، ولا تستخدم مسافات كثيرة لمحاذاة المحتوى.`,
  ),
  createHtmlLesson(
    5,
    'html-text-formatting',
    'Text Formatting (تنسيق النصوص)',
    'ميّز بين التنسيق المرئي والدلالة باستخدام strong وem ووسوم النص الأخرى.',
    `# تنسيق النصوص

اختر الوسم بناءً على معنى النص، ثم استخدم CSS لتغيير مظهره:

- \`<strong>\` للأهمية، و\`<b>\` لجذب الانتباه دون إضافة أهمية دلالية.
- \`<em>\` للتأكيد، و\`<i>\` لصوت أو مصطلح مميز مثل عنوان كتاب.
- \`<mark>\` لإبراز نص ذي صلة، مثل نتيجة بحث.
- \`<u>\` للتعليق النصي غير اللفظي، وليس للتزيين العام.
- \`<abbr title="HyperText Markup Language">\` لتعريف اختصار.
- \`<ins>\` و\`<del>\` لبيان الإضافات والحذف، و\`<s>\` لمعلومة لم تعد دقيقة.
- \`<sup>\` و\`<sub>\` للأسس والحواشي الكيميائية.

\`\`\`html
<p><strong>تنبيه مهم:</strong> راجع <em>الفصل الأول</em>.</p>
<p>الصيغة الكيميائية للماء هي H<sub>2</sub>O.</p>
\`\`\``,
  ),
  createHtmlLesson(
    7,
    'html-lists',
    'Lists (القوائم)',
    'أنشئ قوائم مرتبة وغير مرتبة وقوائم وصف بالوسوم الدلالية المناسبة.',
    `# القوائم

- استخدم \`<ul>\` عندما لا يهم ترتيب العناصر.
- استخدم \`<ol>\` عندما يكون الترتيب مهماً. يمكن ضبط البداية عبر \`start\` أو عكس الترتيب عبر \`reversed\`; وتدعم \`type\` أشكال الترقيم.
- استخدم \`<dl>\` مع \`<dt>\` للمصطلح و\`<dd>\` لشرحه.

\`\`\`html
<ol start="3">
  <li>افتح المحرر</li>
  <li>أنشئ ملفاً</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>لغة ترميز لبناء بنية الصفحة.</dd>
</dl>
\`\`\`

داخل القوائم المرتبة يمكن استخدام \`value\` لتعيين رقم عنصر معين. اجعل بنية القوائم صحيحة، وضع عناصر القائمة \`<li>\` داخل \`<ol>\` أو \`<ul>\`.`,
  ),
  createHtmlLesson(
    8,
    'html-tables',
    'Tables (الجداول)',
    'اعرض البيانات الجدولية مع عناوين واضحة وأقسام وصفوف قابلة للوصول.',
    `# الجداول

الجداول مناسبة للبيانات التي تربط صفوفاً بأعمدة، وليست لبناء تخطيط الصفحة. العناصر الأساسية هي \`<table>\` و\`<tr>\` و\`<th>\` و\`<td>\`.

\`\`\`html
<table>
  <caption>مواعيد الدروس</caption>
  <thead>
    <tr><th scope="col">اليوم</th><th scope="col">الدرس</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">الأحد</th><td>HTML</td></tr>
  </tbody>
</table>
\`\`\`

استخدم \`<caption>\` لوصف الجدول، و\`scope="col"\` أو \`scope="row"\` لتوضيح علاقة الخلايا. يمكن دمج الخلايا باستخدام \`colspan\` و\`rowspan\`، وتجميع الأعمدة عبر \`<colgroup>\` و\`<col>\`. أضف \`<tfoot>\` عند وجود خلاصة للبيانات.`,
  ),
  createHtmlLesson(
    9,
    'html-comments',
    'Comments (التعليقات)',
    'اكتب ملاحظات للمطورين لا تظهر كجزء من محتوى الصفحة.',
    `# التعليقات

التعليقات ملاحظات في مصدر HTML يتجاهلها المتصفح عند عرض محتوى الصفحة:

\`\`\`html
<!-- This is a comment -->
<p>محتوى ظاهر للزائر.</p>
\`\`\`

استخدمها باعتدال لتوضيح قرار أو جزء يحتاج سياقاً. لا تضع كلمات مرور أو بيانات سرية فيها؛ فالتعليقات تبقى مرئية لمن يفحص مصدر الصفحة. ولا تعتمد عليها لإصلاح المسافات بين العناصر المضمنة؛ عالج التخطيط باستخدام CSS.`,
  ),
  createHtmlLesson(
    10,
    'html-classes-and-ids',
    'Classes and IDs (الفئات والمعرفات)',
    'استخدم class للتصنيف المتكرر وid لمعرّف فريد داخل المستند.',
    `# الفئات والمعرّفات

يمكن إسناد الفئة نفسها إلى عناصر متعددة، لذلك تناسب \`class\` تطبيق مجموعة تنسيقات أو تحديد عناصر في JavaScript. أما \`id\` فيجب أن يكون فريداً في المستند، ويستخدم أيضاً كوجهة للرابط الداخلي.

\`\`\`html
<p class="notice">رسالة عامة</p>
<h2 id="chapter-one">الفصل الأول</h2>
<a href="#chapter-one">انتقل إلى الفصل الأول</a>
\`\`\`

يجب أن يحتوي كل معرّف على حرف واحد على الأقل وألا يتضمن مسافات. يمكن أن يبدأ معرّف HTML5 برقم، لكن بدءه بحرف واستخدام أسماء واضحة يسهل التعامل معه في CSS وJavaScript.`,
  ),
  createHtmlLesson(
    11,
    'html-data-attributes',
    'Data Attributes (سمات البيانات)',
    'خزّن بيانات مخصصة مرتبطة بعنصر باستخدام السمات التي تبدأ بـ data-.',
    `# سمات البيانات

تسمح السمات التي تبدأ بـ \`data-\` بإرفاق بيانات مخصصة بعنصر HTML دون اختراع سمات غير معيارية.

\`\`\`html
<button data-user-id="42" class="user-profile">عرض الملف</button>
\`\`\`

في JavaScript يمكن قراءة القيم عبر \`element.dataset.userId\` أو \`getAttribute("data-user-id")\`. استخدم هذه السمات للبيانات الصغيرة المرتبطة بالواجهة، ولا تخزن فيها أسراراً أو معلومات حساسة؛ فهي متاحة في DOM للمستخدم.`,
  ),
  createHtmlLesson(
    12,
    'html-linking-resources',
    'Linking Resources (ربط الموارد)',
    'اربط ملفات CSS والأيقونات والموارد الخارجية من منطقة head.',
    `# ربط الموارد

يستخدم العنصر \`<link>\` عادةً داخل \`<head>\` لربط ملفات خارجية مثل CSS وأيقونة الموقع:

\`\`\`html
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="/favicon.ico">
\`\`\`

تساعد تلميحات الموارد المتصفح على تحسين التحميل عند الحاجة: \`preconnect\` لبدء الاتصال بمصدر معروف، و\`dns-prefetch\` لحل اسمه. استخدم \`prefetch\` للموارد التي يُحتمل احتياجها لاحقاً فقط. لا تستخدم التلميحات بلا قياس، ولا تعتمد على \`prerender\` القديم؛ تحقق من واجهات التحميل الحديثة ودعم المتصفحات قبل اختيار بديل.`,
  ),
  createHtmlLesson(
    13,
    'html-javascript',
    'Include JavaScript Code in HTML (تضمين JavaScript)',
    'أضف JavaScript بملف خارجي أو داخل الصفحة، وافهم توقيت async وdefer.',
    `# تضمين JavaScript

الأفضل غالباً حفظ JavaScript في ملف مستقل وربطه بالصفحة:

\`\`\`html
<script src="/scripts/app.js" defer></script>
\`\`\`

يمكن وضع كود صغير داخل \`<script>\`, لكن فصل الملفات أسهل للصيانة. يحمل \`async\` الملف بالتوازي وينفذه فور اكتمال تحميله، لذلك لا يضمن ترتيب التنفيذ. أما \`defer\` فيحمّل بالتوازي وينفذ بعد تحليل HTML، مع الحفاظ على ترتيب السكربتات المؤجلة.

يمكن وضع محتوى بديل داخل \`<noscript>\` ليظهر عند تعطيل JavaScript.`,
  ),
  createHtmlLesson(
    14,
    'html-with-css',
    'Using HTML with CSS (استخدام CSS مع HTML)',
    'قارن بين CSS الخارجي والداخلي والمضمن واختر الطريقة الأنسب.',
    `# استخدام CSS مع HTML

الطريقة المفضلة للمشاريع هي ملف CSS خارجي:

\`\`\`html
<link rel="stylesheet" href="/styles.css">
\`\`\`

يمكن كتابة قواعد خاصة بالصفحة داخل \`<style>\` في \`<head>\`, أو استخدام سمة \`style\` مباشرة على عنصر. الأسلوب المضمن أقل قابلية لإعادة الاستخدام ويصعب صيانته، لذلك يُفضل تجنبه في الصفحات المعتادة.

عند تعارض قواعد متساوية في الأولوية، تكون القاعدة اللاحقة في ترتيب المصدر هي الفاعلة. كما تؤثر الخصوصية ومصدر القاعدة في النتيجة؛ لا تعتمد على ترتيب الملفات وحده.`,
  ),
  createHtmlLesson(
    15,
    'html-images',
    'Images (الصور)',
    'أضف الصور مع نص بديل مناسب، واستخدم الصور المتجاوبة عند الحاجة.',
    `# الصور

العنصر \`<img>\` عنصر فارغ؛ لا يحتاج وسم إغلاق. اكتب وصفاً في \`alt\` إذا كانت الصورة تنقل معلومة، واستخدم \`alt=""\` للصورة الزخرفية:

\`\`\`html
<img src="/images/flower.jpg" alt="زهرة حمراء في حديقة">
\`\`\`

يساعد \`srcset\` المتصفح على اختيار ملف مناسب لأحجام الشاشات أو كثافة البكسل. استخدم \`<picture>\` عندما تحتاج مصادر بديلة بناءً على نوع الصورة أو شروط \`media\`. لا تكرر في النص البديل معلومات موجودة بوضوح في النص المحيط.`,
  ),
  createHtmlLesson(
    16,
    'html-image-maps',
    'Image Maps (خرائط الصور)',
    'اربط مناطق محددة داخل صورة بروابط باستخدام map وarea.',
    `# خرائط الصور

تتيح خريطة الصورة تحديد مناطق قابلة للنقر باستخدام \`<map>\` و\`<area>\`. اربط الصورة بالخريطة من خلال قيمة \`usemap\`:

\`\`\`html
<img src="/images/shapes.png" alt="أشكال هندسية" usemap="#shapes">
<map name="shapes">
  <area shape="circle" coords="100,100,40" href="/circle" alt="الدائرة">
  <area shape="rect" coords="160,20,260,100" href="/rectangle" alt="المستطيل">
</map>
\`\`\`

تحدد \`shape\` و\`coords\` شكل المنطقة وموقعها. قدم لكل منطقة اسماً مفهوماً في \`alt\`، واختبرها بلوحة المفاتيح وقارئ الشاشة. في كثير من الواجهات الحديثة تكون الروابط أو الأزرار المنفصلة أسهل في الاستجابة والوصول.`,
  ),
  createHtmlLesson(
    18,
    'html-forms',
    'Forms (النماذج)',
    'اجمع حقول الإدخال وأرسلها إلى وجهة باستخدام form وسمات الإرسال.',
    `# النماذج

يجمع العنصر \`<form>\` حقولاً لإرسال البيانات. تحدد \`action\` الوجهة، و\`method\` طريقة الإرسال، وغالباً تكون \`GET\` لطلبات القراءة و\`POST\` لإرسال بيانات إلى الخادم.

\`\`\`html
<form action="/signup" method="post">
  <fieldset>
    <legend>إنشاء حساب</legend>
    <label for="email">البريد الإلكتروني</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">إرسال</button>
  </fieldset>
</form>
\`\`\`

عند رفع الملفات استخدم \`method="post"\` و\`enctype="multipart/form-data"\`. استخدم \`<fieldset>\` و\`<legend>\` لتجميع الحقول ذات الصلة. لا تعتمد على التحقق في المتصفح وحده؛ يجب التحقق من البيانات على الخادم أيضاً.`,
  ),
  createHtmlLesson(
    19,
    'html-div',
    'Div Element (عنصر Div)',
    'استخدم div كحاوية عامة عندما لا يوجد عنصر دلالي أنسب.',
    `# عنصر div

العنصر \`<div>\` حاوية عامة كتلية لا تضيف معنى دلالياً بمفردها. يمكن استخدامه لتجميع عناصر لأغراض التنسيق أو البرمجة عندما لا يناسب المحتوى عنصراً أكثر دلالة.

\`\`\`html
<div class="card">
  <h2>عنوان البطاقة</h2>
  <p>محتوى البطاقة.</p>
</div>
\`\`\`

تجنب التداخل العميق غير الضروري. اختر \`<article>\` أو \`<section>\` أو غيرهما إذا كانت طبيعة المحتوى تناسبهما، واستخدم \`<span>\` للحاوية العامة المضمنة.`,
  ),
  createHtmlLesson(
    21,
    'html-navigation-bars',
    'Navigation Bars (أشرطة التنقل)',
    'أنشئ قائمة تنقل مفهومة باستخدام nav وروابط وقائمة عند ملاءمتها.',
    `# أشرطة التنقل

يحدد \`<nav>\` منطقة تحتوي على روابط التنقل الرئيسية. يمكن تنظيم الروابط باستخدام قائمة، مع نصوص تصف وجهاتها:

\`\`\`html
<nav aria-label="التنقل الرئيسي">
  <ul>
    <li><a href="/">الرئيسية</a></li>
    <li><a href="/lessons">الدروس</a></li>
  </ul>
</nav>
\`\`\`

ليس كل رابط في الصفحة بحاجة إلى \`<nav>\`; استخدمه لكتل التنقل المهمة. أضف اسماً مميزاً عند وجود أكثر من منطقة تنقل، واترك التنسيق البصري لـ CSS.`,
  ),
  createHtmlLesson(
    22,
    'html-label',
    'Label Element (عنصر التسمية)',
    'اربط تسمية نصية بحقلها لتحسين سهولة الاستخدام وإمكانية الوصول.',
    `# عنصر label

يربط \`<label>\` وصفاً بحقل إدخال. يمكن إحاطة الحقل بالتسمية:

\`\`\`html
<label>
  <input type="checkbox" name="cats">
  أحب القطط
</label>
\`\`\`

أو استخدام \`for\` مع \`id\` مطابق:

\`\`\`html
<label for="email">البريد الإلكتروني</label>
<input id="email" name="email" type="email">
\`\`\`

تساعد التسمية المستخدم على معرفة الغرض من الحقل، كما توسّع المنطقة القابلة للنقر لبعض عناصر الإدخال. لا تستخدم نصاً نائباً داخل الحقل بديلاً عن التسمية.`,
  ),
  createHtmlLesson(
    23,
    'html-output',
    'Output Element (عنصر الإخراج)',
    'اعرض نتيجة محسوبة واربطها بعناصر الإدخال التي ساهمت في إنتاجها.',
    `# عنصر output

يُستخدم \`<output>\` لتمثيل نتيجة عملية حسابية أو تفاعل. يمكن لسمة \`for\` ذكر معرّفات العناصر التي ساهمت في النتيجة، ويمكن لـ \`form\` ربطه بنموذج:

\`\`\`html
<form id="calculator">
  <label for="first">الأول</label>
  <input id="first" name="first" type="number">
  <output name="result" for="first" form="calculator">0</output>
</form>
\`\`\`

يحدّث JavaScript عادةً قيمة الإخراج استجابةً لتغيير المدخلات؛ ووجود العنصر وحده لا ينفذ الحساب.`,
  ),
  createHtmlLesson(
    24,
    'html-void-elements',
    'Void Elements (العناصر الفارغة)',
    'تعرّف على عناصر HTML التي لا تحتوي على محتوى ولا تحتاج وسم إغلاق.',
    `# العناصر الفارغة

العناصر الفارغة لا تحتوي على محتوى داخلي ولا تملك وسم إغلاق. من أمثلتها \`<area>\` و\`<base>\` و\`<br>\` و\`<col>\` و\`<hr>\` و\`<img>\` و\`<input>\` و\`<link>\` و\`<meta>\` و\`<source>\`.

\`\`\`html
<img src="/logo.svg" alt="شعار الأكاديمية">
<br>
<input type="email" name="email">
\`\`\`

اكتبها بصيغة HTML المعتادة دون وسم إغلاق. الشرطة المائلة قبل \`>\` اختيارية في HTML، ولا تحول العنصر إلى عنصر مغلق.`,
  ),
  createHtmlLesson(
    25,
    'html-media-elements',
    'Media Elements (عناصر الوسائط)',
    'ضمّن الصوت والفيديو مع عناصر تحكم وبدائل لمصادر الوسائط.',
    `# الصوت والفيديو

تتيح \`<audio>\` و\`<video>\` تشغيل الوسائط مباشرة. أضف \`controls\` ليتمكن المستخدم من التحكم بالتشغيل، ويمكن توفير أكثر من مصدر:

\`\`\`html
<audio controls>
  <source src="/media/lesson.mp3" type="audio/mpeg">
  متصفحك لا يدعم تشغيل الصوت.
</audio>

<video controls width="500" poster="/images/preview.jpg">
  <source src="/media/lesson.mp4" type="video/mp4">
  متصفحك لا يدعم تشغيل الفيديو.
</video>
\`\`\`

تشمل السمات \`loop\` و\`muted\` و\`poster\`. تجنب تشغيل الصوت تلقائياً؛ وقد تمنع المتصفحات التشغيل التلقائي للصوت. للفيديو التلقائي الصامت أضف \`muted\` و\`playsinline\` عند ملاءمته، ووفّر ترجمات أو نصاً بديلاً للمحتوى المهم.`,
  ),
  createHtmlLesson(
    26,
    'html-progress',
    'Progress Element (عنصر التقدم)',
    'اعرض مقدار التقدم في مهمة باستخدام progress وقيمة قصوى واضحة.',
    `# عنصر التقدم

يمثل \`<progress>\` مدى اكتمال مهمة جارية:

\`\`\`html
<label for="upload">رفع الملف</label>
<progress id="upload" value="22" max="100">22%</progress>
\`\`\`

عندما تكون قيمة \`value\` موجودة، فهي مقدار التقدم الحالي؛ واحذفها إذا كان التقدم غير محدد. اربط العنصر بتسمية مفهومة. يمكن تنسيقه بـ CSS، لكن مظهره يختلف بين المتصفحات؛ تجنب بادئات المتصفح القديمة إلا عند وجود حاجة مثبتة.`,
  ),
  createHtmlLesson(
    27,
    'html-selection-menus',
    'Selection Menu Controls (قوائم الاختيار)',
    'أنشئ قوائم اختيار ثابتة أو مجموعات خيارات واقتراحات للإدخال.',
    `# قوائم الاختيار

يقدم \`<select>\` خيارات محددة داخل \`<option>\`. تسمح \`multiple\` باختيار عدة خيارات، ويمكن ضبط الارتفاع المرئي باستخدام \`size\`. اجمع الخيارات عبر \`<optgroup>\`.

\`\`\`html
<label for="track">المسار</label>
<select id="track" name="track">
  <optgroup label="الواجهات">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
  </optgroup>
</select>
\`\`\`

يوفر \`<datalist>\` اقتراحات لحقل نصي، لكنه لا يفرض الاختيار منها. اربط القائمة بالحقل عبر \`list\`، واستخدم \`value\` لإرسال القيمة المناسبة.`,
  ),
  createHtmlLesson(
    28,
    'html-embed',
    'Embed (التضمين)',
    'استخدم embed لمحتوى خارجي فقط عند الحاجة، وفضّل الوسوم المتخصصة.',
    `# عنصر embed

يمكن للعنصر \`<embed>\` تضمين مورد خارجي تدعمه المتصفحات أو الإضافات:

\`\`\`html
<embed type="application/pdf" src="/documents/guide.pdf" width="640" height="480">
\`\`\`

كان Flash مثالاً شائعاً قديماً، لكنه متوقف وغير مدعوم؛ لا تستخدمه. للصوت والفيديو استخدم \`<audio>\` و\`<video>\`، ولملفات PDF أو المحتوى الخارجي اختر وسيلة مناسبة مع رابط بديل للمستخدم.`,
  ),
  createHtmlLesson(
    29,
    'html-iframes',
    'IFrames (الإطارات المضمنة)',
    'ضمّن صفحة أخرى باستخدام iframe مع عنوان وصلاحيات محدودة.',
    `# الإطارات المضمنة

يعرض \`<iframe>\` سياق تصفح منفصلاً داخل الصفحة:

\`\`\`html
<iframe
  src="/embedded-page.html"
  title="صفحة الدرس المضمنة"
  sandbox
  loading="lazy">
</iframe>
\`\`\`

تحد سمة \`sandbox\` من قدرات المحتوى المضمن؛ لا تضف صلاحيات مثل السكربتات أو النماذج إلا عند الحاجة وبأضيق نطاق. تتيح \`srcdoc\` تضمين HTML مباشرة، لكن تعامل مع المحتوى غير الموثوق بحذر. أضف دائماً \`title\` وصفياً للإتاحة.`,
  ),
  createHtmlLesson(
    30,
    'html-content-languages',
    'Content Languages (لغات المحتوى)',
    'حدد لغة الصفحة أو جزء منها باستخدام سمة lang.',
    `# لغات المحتوى

تحدد سمة \`lang\` لغة النص، ويساعد ذلك قارئات الشاشة ومحركات البحث وأدوات التدقيق الإملائي:

\`\`\`html
<html lang="ar" dir="rtl">
  <body>
    <p>مرحباً! <span lang="en" dir="ltr">Hello!</span></p>
  </body>
</html>
\`\`\`

ترث العناصر عادةً اللغة من العنصر الأب، ويمكن تجاوزها على عنصر فرعي. استخدم رمز لغة صالحاً وفق BCP 47، وأضف \`dir\` عند الحاجة لتحديد اتجاه الكتابة.`,
  ),
  createHtmlLesson(
    31,
    'html-svg',
    'SVG (الرسومات المتجهة)',
    'استخدم SVG للرسومات القابلة للتكبير، مضمّنة أو عبر ملف خارجي.',
    `# الرسومات المتجهة SVG

تُرسم رسومات SVG بالمتجهات، لذا يمكن تكبيرها دون فقدان دقتها. يمكن كتابة SVG داخل HTML والتحكم بعناصره عبر CSS وJavaScript:

\`\`\`html
<svg viewBox="0 0 100 100" role="img" aria-labelledby="circle-title">
  <title id="circle-title">دائرة زرقاء</title>
  <circle cx="50" cy="50" r="40" fill="blue">
</svg>
\`\`\`

يمكن عرض ملف خارجي باستخدام \`<img src="image.svg" alt="...">\`؛ وهذه طريقة مناسبة لمعظم الصور. يمكن أيضاً تضمينه عبر \`<object>\` عند الحاجة إلى تفاعل، مع تقديم محتوى بديل.`,
  ),
  createHtmlLesson(
    32,
    'html-canvas',
    'Canvas (اللوحة)',
    'جهز مساحة رسم ثنائية الأبعاد، وارسم محتواها باستخدام JavaScript.',
    `# عنصر Canvas

يوفر \`<canvas>\` مساحة نقطية يرسم محتواها JavaScript. حدد أبعادها وقدم بديلاً نصياً أو محتوى داخل العنصر:

\`\`\`html
<canvas id="chart" width="320" height="180">
  رسم يوضح نتائج الاستبيان.
</canvas>
<script>
  const canvas = document.querySelector("#chart");
  const context = canvas.getContext("2d");
  context.fillRect(20, 20, 100, 60);
</script>
\`\`\`

بعد الحصول على سياق \`2d\` يمكن استخدام دوال مثل \`fillRect\` و\`fillText\`. محتوى الرسم لا يصبح تلقائياً مفهوماً لقارئات الشاشة؛ وفر وصفاً أو بديلاً مناسباً.`,
  ),
  createHtmlLesson(
    33,
    'html-meta-information',
    'Meta Information (معلومات metadata)',
    'أضف بيانات وصفية للترميز والعرض ومحركات البحث ومشاركة الروابط.',
    `# معلومات metadata

توضع البيانات الوصفية داخل \`<head>\` ولا تظهر عادةً كمحتوى الصفحة:

\`\`\`html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="دليل مبسط لتعلم HTML">
<meta name="author" content="فريق الأكاديمية">
<meta name="robots" content="noindex">
\`\`\`

تشمل أسماء metadata الشائعة \`description\` و\`author\` و\`application-name\`. استخدم Open Graph وبيانات Twitter Cards عندما تحتاج إلى تخصيص معاينة المشاركة. لا تضف كلمات مفتاحية على أمل تحسين الترتيب؛ ولا تستخدم \`noindex\` إلا إذا كنت تقصد منع فهرسة الصفحة.`,
  ),
  createHtmlLesson(
    34,
    'html-computer-code',
    'Marking up Computer Code (ترميز الكود)',
    'اعرض الشيفرات مع الحفاظ على المسافات واستخدم الوسوم الدلالية المناسبة.',
    `# ترميز الشيفرات

يمثل \`<code>\` جزءاً من الشيفرة، بينما يحافظ \`<pre>\` على المسافات والأسطر:

\`\`\`html
<pre><code>const answer = 42;
console.log(answer);</code></pre>
\`\`\`

يمكن استخدام \`<var>\` للمتغيرات و\`<samp>\` لمخرجات البرنامج و\`<kbd>\` لمدخلات لوحة المفاتيح. استخدم تمييزاً بصرياً عبر CSS، ولا تضع محتوى غير موثوق داخل HTML دون معالجة مناسبة.`,
  ),
  createHtmlLesson(
    35,
    'html-quotes',
    'Marking-up Quotes (ترميز الاقتباسات)',
    'ميّز الاقتباس المضمن عن الاقتباس الطويل واذكر مصدره بوضوح.',
    `# الاقتباسات

استخدم \`<q>\` لاقتباس قصير مضمّن ضمن فقرة، و\`<blockquote>\` لاقتباس أطول مستقل:

\`\`\`html
<p>قالت الكاتبة: <q>التعلم رحلة مستمرة.</q></p>
<blockquote cite="https://example.com/article">
  <p>نص مقتبس في فقرة مستقلة.</p>
</blockquote>
<p>المصدر: <cite>مقال عن التعلم</cite></p>
\`\`\`

يمكن أن يشير \`cite\` في \`blockquote\` إلى مصدر الاقتباس، ويعرض \`<cite>\` عنوان عمل إبداعي. لا تستخدم هذه الوسوم لمجرد الحصول على تنسيق مائل أو مسافات.`,
  ),
  createHtmlLesson(
    36,
    'html-tabindex',
    'Tabindex (ترتيب التنقل)',
    'أدرج العناصر القابلة للتركيز في ترتيب لوحة المفاتيح دون إنشاء ترتيب مربك.',
    `# سمة tabindex

- \`tabindex="0"\` يضيف العنصر إلى ترتيب التركيز الطبيعي.
- \`tabindex="-1"\` يسمح بتركيز العنصر برمجياً، لكنه لا يضيفه إلى التنقل المعتاد بزر Tab.
- القيم الموجبة تنشئ ترتيباً مخصصاً غالباً ما يربك المستخدمين ويصعب صيانته.

\`\`\`html
<div id="status" tabindex="-1">تم حفظ التغييرات.</div>
\`\`\`

استخدم عناصر HTML التفاعلية الأصلية مثل \`<button>\` و\`<a>\` بدلاً من جعل عناصر عامة قابلة للتركيز بلا داعٍ. اختبر التنقل بلوحة المفاتيح وتأكد من وضوح مؤشر التركيز.`,
  ),
  createHtmlLesson(
    37,
    'html-global-attributes',
    'Global Attributes (السمات العامة)',
    'استخدم السمات العامة المشتركة لتحديد الهوية واللغة والسلوك.',
    `# السمات العامة

تقبل عناصر HTML كثيرة سمات عامة، منها \`class\` و\`id\` و\`style\` و\`title\` و\`lang\` و\`dir\`.

- تجعل \`contenteditable\` محتوى العنصر قابلاً للتحرير في المتصفح.
- تشير \`hidden\` إلى أن المحتوى غير معروض حالياً.
- تتيح \`draggable\` سحب العنصر، لكن يلزم JavaScript لتعريف تجربة السحب والإفلات.

\`\`\`html
<p lang="ar" dir="rtl" class="note">ملاحظة تعليمية</p>
\`\`\`

استخدم \`title\` للتلميحات الإضافية لا للمعلومات الأساسية، ولا تضف \`contenteditable\` أو \`draggable\` إلا إذا كانت هناك تجربة مستخدم مكتملة تدعمهما.`,
  ),
  createHtmlLesson(
    38,
    'html-offline-cache',
    'HTML 5 Cache والتخزين دون اتصال',
    'تعرف على AppCache القديم ولماذا يجب استخدام Service Workers بدلاً منه.',
    `# التخزين المؤقت والعمل دون اتصال

كان AppCache يتيح استخدام سمة \`manifest\` على عنصر \`<html>\` لتخزين صفحات للعمل دون اتصال. هذه الواجهة **مهجورة** ولا ينبغي استخدامها في مشاريع جديدة:

\`\`\`html
<!-- مثال تاريخي فقط: لا تستخدم AppCache في تطبيق جديد -->
<html manifest="index.appcache">
\`\`\`

لإنشاء تجربة دون اتصال حديثة، استخدم Service Worker وواجهات Cache Storage مع استراتيجية تخزين واضحة. لا تضف AppCache إلى صفحة إنتاجية؛ يرد المثال هنا للتعرف على الشيفرات القديمة فقط.`,
  ),
  createHtmlLesson(
    39,
    'html-event-attributes',
    'HTML Event Attributes (سمات الأحداث)',
    'تعرف على سمات الأحداث المضمنة واستخدم مستمعات الأحداث المنفصلة في المشاريع.',
    `# سمات أحداث HTML

توجد سمات تاريخية مثل \`onfocus\` و\`onblur\` و\`onchange\` و\`oninput\` و\`onsubmit\` و\`onkeydown\`. كانت تسمح بكتابة معالج الحدث مباشرة على العنصر:

\`\`\`html
<!-- صيغة توضيحية قديمة؛ يفضل ربط الحدث في JavaScript -->
<button onclick="sayHello()">تحية</button>
\`\`\`

يفضل ربط الأحداث في ملف JavaScript عبر \`addEventListener\`؛ فهذا يفصل السلوك عن البنية ويسهل صيانته. سمة \`onkeypress\` مهجورة؛ استخدم أحداث لوحة المفاتيح المناسبة مثل \`keydown\` عند الحاجة.`,
  ),
  createHtmlLesson(
    40,
    'html-character-entities',
    'Character Entities (كيانات الأحرف)',
    'اكتب الرموز المحجوزة والأحرف الخاصة بصيغ HTML entities.',
    `# كيانات الأحرف

تستخدم HTML كيانات الأحرف لتمثيل الرموز المحجوزة أو الرموز التي يصعب كتابتها مباشرة. تبدأ الكيانات المسماة بعلامة \`&\` وتنتهي بـ \`;\`:

\`\`\`html
&lt;   &gt;   &amp;   &copy;   &nbsp;
\`\`\`

مثلاً، تعرض \`&lt;\` الرمز \`<\` كنص بدلاً من تفسيره كبداية وسم، وتعرض \`&amp;\` علامة \`&\`. استخدم UTF-8 للنصوص، واكتب الكيانات عند الحاجة لتجنب تفسير الرموز كعلامات HTML.`,
  ),
  createHtmlLesson(
    41,
    'html-aria-accessibility',
    'ARIA (إمكانية الوصول)',
    'استخدم ARIA لدعم التقنيات المساعدة عندما لا تكفي دلالات HTML الأصلية.',
    `# ARIA وإمكانية الوصول

تضيف سمات ARIA معلومات عن الأدوار والحالات والتحديثات الديناميكية للتقنيات المساعدة:

\`\`\`html
<nav aria-label="التنقل الرئيسي">...</nav>
<div role="status" aria-live="polite">تم حفظ التغييرات.</div>
\`\`\`

توجد أدوار مثل \`alert\` و\`button\` و\`navigation\` و\`main\`, لكن الأفضل استخدام العنصر الأصلي المناسب: زر \`<button>\` بدلاً من \`<div role="button">\`. لا تضف ARIA إذا كانت دلالة HTML تكفي؛ فقاعدة العمل هي ألا تتجاوز الدلالة الأصلية أو تستبدلها بمعلومات خاطئة.`,
  ),

  // ----------------------------------------------------
  // CSS Lesson 1: css-selectors-and-cascade
  // ----------------------------------------------------
  {
    slug: 'css-selectors-and-cascade',
    courseSlug: 'css-fundamentals',
    moduleSlug: getCssModuleSlug(4),
    order: 4,
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
    moduleSlug: getCssModuleSlug(7),
    order: 7,
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
    moduleSlug: getCssModuleSlug(16),
    order: 16,
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
    moduleSlug: getCssModuleSlug(13),
    order: 13,
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

  createCssLesson(
    1,
    'css-getting-started',
    'Getting Started with CSS (البدء مع CSS)',
    'تعرف على طرق إضافة CSS إلى الصفحة، واستيراد الملفات، والقوائم.',
    `# البدء مع CSS

يمكن إضافة التنسيقات بثلاث طرق:

\`\`\`html
<link rel="stylesheet" href="style.css">
\`\`\`

ضع الرابط داخل \`<head>\`. ويمكن كتابة قواعد داخلية داخل \`<style>\` أو استخدام سمة \`style\` مباشرة، لكن الملف الخارجي أسهل للصيانة وإعادة الاستخدام. تسمح \`@import url("/css/styles.css");\` باستيراد ملف آخر، لكنها قد تؤخر تحميله؛ غالباً يكون ربط الملفات مباشرة أو عبر أداة البناء أفضل.

تستطيع JavaScript تغيير التنسيق عبر \`element.style.color = "red"\`، لكن لتبديل الحالات يفضل غالباً تغيير class. لتنسيق القوائم استخدم \`list-style-type\` أو \`list-style-image\` و\`list-style-position\`; وتأكد من وضوح العلامة وقراءتها.`,
  ),
  createCssLesson(
    2,
    'css-rule-structure',
    'Structure and Formatting of a CSS Rule (تركيب القاعدة)',
    'افهم المحدد وكتلة التعريفات، واكتب قواعد واضحة ومتعددة المحددات.',
    `# تركيب قاعدة CSS

تتكون القاعدة من محدد يختار العناصر، ثم كتلة تعريفات بين الأقواس المعقوفة. كل تعريف يضم خاصية وقيمة:

\`\`\`css
div,
p {
  color: blue;
  text-shadow: 1px 1px 2px #999;
}
\`\`\`

تفصل الفاصلة بين المحددات التي تشترك في القواعد. يمكن أن تقبل الخاصية عدة قيم، مثل \`text-shadow\`. تدعم المتصفحات الحديثة CSS Nesting:

\`\`\`css
.card {
  padding: 1rem;
  & :hover { color: blue; }
  h2 { color: #333; }
}
\`\`\`

احرص على كتابة المحدد المتداخل المقصود؛ فالمسافة بعد \`&\` تعني أن العنصر المطابق داخل عنصر \`.card\`.`,
  ),
  createCssLesson(
    3,
    'css-comments',
    'Comments (التعليقات)',
    'أضف ملاحظات في ملف CSS لتوضيح الأقسام والقرارات غير الواضحة.',
    `# التعليقات في CSS

تبدأ التعليقات بـ \`/*\` وتنتهي بـ \`*/\`. لا يوجد بناء منفصل لتعليق سطر واحد؛ الصيغة نفسها تعمل لسطر أو لعدة أسطر:

\`\`\`css
/* لون العلامة التجارية */
:root {
  --brand-color: #2563eb;
}
\`\`\`

لا يمكن تداخل تعليقات CSS بعضها داخل بعض. اكتب تعليقاً يشرح سبباً أو قيداً مهماً، لا ما تفعله كل خاصية بوضوح. تذكر أن التعليقات تظهر في ملفات CSS التي يحمّلها المستخدم، لذلك لا تضع فيها أسراراً.`,
  ),
  createCssLesson(
    5,
    'css-backgrounds',
    'Backgrounds (الخلفيات)',
    'تحكم بألوان الخلفيات وصورها وتدرجاتها ومواضعها.',
    `# الخلفيات

تقبل \`background-color\` ألواناً بصيغ مختلفة، ويمكن لـ \`background-image\` عرض صورة أو تدرج:

\`\`\`css
.hero {
  background:
    linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)),
    url("/images/hero.jpg") center / cover no-repeat;
}
\`\`\`

تتحكم \`background-size: cover\` بتغطية العنصر مع احتمال قص الصورة، بينما \`contain\` تعرض الصورة كاملة. يمكن تحديد \`background-position\` و\`background-repeat\` و\`background-origin\`، وتعدد الخلفيات بفصلها بفواصل. استخدم \`background-attachment: fixed\` بحذر؛ قد يؤثر على الأداء وتجربة الأجهزة المحمولة.`,
  ),
  createCssLesson(
    6,
    'css-centering',
    'Centering (توسيط العناصر)',
    'اختر أسلوب التوسيط الملائم لنوع المحتوى والتخطيط.',
    `# توسيط العناصر

للتوسيط الأفقي لنص استخدم \`text-align: center\`. يمكن توسيط حاوية ذات عرض محدد بهوامش تلقائية:

\`\`\`css
.container { width: min(100% - 2rem, 60rem); margin-inline: auto; }
.parent { display: flex; justify-content: center; align-items: center; }
\`\`\`

يوفر Flexbox أو Grid حلولاً مباشرة للتوسيط الأفقي والرأسي. يمكن أيضاً استخدام تموضع مطلق مع \`top/left: 50%\` و\`transform: translate(-50%, -50%)\` عند ملاءمة التراكب. لا تجعل \`line-height\` مساوياً للارتفاع إلا لنص قصير بسطر واحد؛ وتجنب حيل table-cell للتخطيطات الحديثة.`,
  ),
  createCssLesson(
    8,
    'css-margins',
    'Margins (الهوامش)',
    'اضبط المساحة خارج الحدود، وافهم اختصار margin وانهيار الهوامش.',
    `# الهوامش

تضيف \`margin\` مساحة خارج حدود العنصر. يمكن كتابة قيمة لكل جانب أو استخدام الاختصار باتجاه عقارب الساعة:

\`\`\`css
.card { margin: 1rem 2rem 1.5rem 0.5rem; }
.centered { width: 20rem; margin-inline: auto; }
\`\`\`

يمكن أن تكون الهوامش سالبة. قد تنهار الهوامش الرأسية المتجاورة بين عناصر الكتل، فتتداخل حسابياً ويظهر الأكبر بدلاً من مجموعهما. لا يحدث الانهيار في كل سياق؛ Flexbox وGrid مثلاً لا ينهاران بهذه الطريقة. استخدم \`gap\` لتباعد عناصر التخطيط عندما يكون ذلك أوضح.`,
  ),
  createCssLesson(
    9,
    'css-padding',
    'Padding (الحشوة)',
    'أضف مساحة داخلية بين المحتوى والحدود باستخدام قيم الجوانب أو الاختصار.',
    `# الحشوة

تتحكم \`padding\` بالمساحة بين محتوى العنصر وحدوده. تقبل الاختصار قيمة واحدة إلى أربع قيم:

\`\`\`css
.card { padding: 1rem 2rem 1.5rem 0.5rem; }
.button { padding-block: 0.75rem; padding-inline: 1.25rem; }
\`\`\`

مع أربع قيم يكون الترتيب أعلى، يمين، أسفل، يسار. لا تقبل الحشوة قيماً سالبة. استخدم الخصائص المنطقية مثل \`padding-inline\` و\`padding-block\` لدعم اتجاهات الكتابة المختلفة.`,
  ),
  createCssLesson(
    10,
    'css-borders',
    'Border (الحدود)',
    'نسق حدود العناصر وزواياها، وافهم أثر الحدود على أبعاد الصندوق.',
    `# الحدود

يجمع الاختصار \`border\` العرض والنمط واللون. من الأنماط الشائعة \`solid\` و\`dotted\` و\`dashed\` و\`double\`. استخدم \`border-radius\` لتدوير الزوايا:

\`\`\`css
.card { border: 1px solid #cbd5e1; border-radius: 0.75rem; }
.avatar { border-radius: 50%; }
\`\`\`

تدعم CSS أيضاً \`border-image\` للحدود المزخرفة، و\`outline\` أو \`box-shadow\` لتأثيرات خارجية. في الجداول قد يدمج \`border-collapse: collapse\` حدود الخلايا. ميزة \`corner-shape\` حديثة ودعمها محدود؛ استخدمها كتطوير تدريجي فقط مع بديل أساسي بـ \`border-radius\`.`,
  ),
  createCssLesson(
    11,
    'css-outlines',
    'Outlines (الخطوط الخارجية)',
    'أضف خطاً خارج الحدود دون تغيير مساحة العنصر أو تخطيطه.',
    `# الخطوط الخارجية

لا يشغل \`outline\` مساحة في نموذج الصندوق، لذلك لا يزيح العناصر المجاورة:

\`\`\`css
button:focus-visible { outline: 3px solid #2563eb; outline-offset: 3px; }
\`\`\`

يمكن تحديد \`outline-style\` و\`outline-width\` و\`outline-color\` أو استخدام الاختصار. لا تزل مؤشر التركيز الافتراضي إلا إذا وفرت بديلاً واضحاً ومتاحاً؛ فهو مهم لمستخدمي لوحة المفاتيح.`,
  ),
  createCssLesson(
    12,
    'css-overflow',
    'Overflow (الفيض)',
    'تحكم بما يحدث للمحتوى الذي يتجاوز حدود الحاوية.',
    `# الفيض

تحدد \`overflow\` كيفية عرض المحتوى المتجاوز: \`visible\` أو \`hidden\` أو \`clip\` أو \`scroll\` أو \`auto\`. يمكن التحكم بالمحورين عبر \`overflow-x\` و\`overflow-y\`.

\`\`\`css
.scroll-panel { max-height: 20rem; overflow: auto; }
.long-word { overflow-wrap: break-word; }
\`\`\`

قد ينشئ \`overflow: hidden\` أو \`auto\` سياق تنسيق جديداً ويقص الظلال أو المحتوى. اختر القص فقط إذا كان مقصوداً. استخدم \`overflow-wrap: anywhere\` أو \`break-word\` للتعامل مع الكلمات الطويلة.`,
  ),
  createCssLesson(
    14,
    'css-floats',
    'Floats (العوم)',
    'افهم float وclear لتنسيق نص حول الصور وصيانة تخطيطات قديمة.',
    `# العوم

صممت \`float\` أساساً لجعل النص يلتف حول صورة أو عنصر صغير:

\`\`\`css
.article-image { float: inline-start; margin: 0 1rem 1rem 0; }
.next-section { clear: both; }
\`\`\`

قد لا يحتوي العنصر الأب ارتفاع العناصر العائمة. كان clearfix باستخدام عنصر كاذب حلاً شائعاً، لكن إنشاء سياق تنسيق أو استخدام Flexbox/Grid غالباً أوضح للتخطيطات. لا تستخدم \`float\` كبديل عن أدوات التخطيط الحديثة.`,
  ),
  createCssLesson(
    15,
    'css-typography',
    'Typography (الطباعة)',
    'حسّن قابلية قراءة النص بإعداد الخط والحجم والمسافات والزخرفة.',
    `# الطباعة

تحدد \`font-family\` قائمة الخطوط البديلة، وتحدد \`font-size\` الحجم. يدعم الاختصار \`font\` النمط والوزن والحجم/ارتفاع السطر والعائلة:

\`\`\`css
body { font: 400 1rem/1.6 system-ui, sans-serif; }
h1 { text-transform: none; letter-spacing: -0.02em; }
.truncate { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
\`\`\`

تتحكم \`text-shadow\` بالظل، و\`text-transform\` بتحويل حالة الأحرف، و\`letter-spacing\` و\`word-spacing\` بالمسافات. تحقق من التباين وحجم النص وارتفاع السطر، ولا تستخدم التحويل البصري بديلاً عن الكتابة الصحيحة.`,
  ),
  createCssLesson(
    17,
    'css-cascade-specificity',
    'Cascading and Specificity (التتالي والأولوية)',
    'افهم كيف يحسم المتصفح تعارض القواعد بحسب المصدر والأهمية والخصوصية.',
    `# التتالي والخصوصية

عند تعارض القواعد، يحسم المتصفح النتيجة عبر التتالي: الأهمية ومصدر القاعدة وطبقات التتالي والخصوصية ثم ترتيب الظهور. بصورة مبسطة، تتقدم محددات المعرفات على الفئات والسمات والفئات الكاذبة، وهذه تتقدم على محددات العناصر والعناصر الكاذبة.

\`\`\`css
.notice { color: blue; }
#warning { color: red; }
\`\`\`

لا تستخدم \`!important\` كحل افتراضي؛ فهو يجعل التعديلات اللاحقة أصعب. للأنماط المهمة تُراعى أيضاً أنماط المستخدم والمتصفح والأنماط المضمنة، كما يمكن لتنظيم \`@layer\` ضبط الأولوية. اكتب محددات بسيطة واستخدم أسماء classes واضحة.`,
  ),
  createCssLesson(
    18,
    'css-colors',
    'Colors (الألوان)',
    'اكتب الألوان بصيغ مختلفة واستخدم currentColor وميزات الألوان الحديثة.',
    `# الألوان

تقبل CSS أسماء ألوان وشفافاً، وصيغ Hex وRGB وHSL:

\`\`\`css
.notice { color: #f00; border-color: currentColor; }
.overlay { background: rgb(0 0 0 / 50%); }
.accent { color: hsl(220 90% 50%); }
\`\`\`

تستخدم \`currentColor\` قيمة خاصية \`color\` الحالية. تتوفر صيغ حديثة مثل \`oklch()\` و\`color-mix()\` لتوليد لوحات أكثر انتظاماً، لكن افحص دعم المتصفحات أو وفر قيمة بديلة. اختبر تباين النص مع الخلفية لتلبية قابلية القراءة.`,
  ),
  createCssLesson(
    19,
    'css-opacity',
    'Opacity (الشفافية)',
    'اضبط شفافية العنصر وتعرّف على أثر opacity في التكديس والمحتوى.',
    `# الشفافية

تأخذ \`opacity\` قيمة بين صفر وواحد؛ الصفر شفاف بالكامل والواحد معتم. تطبق الشفافية على العنصر وكل أبنائه:

\`\`\`css
.disabled { opacity: 0.55; }
.overlay { background-color: rgb(0 0 0 / 50%); }
\`\`\`

إذا أردت شفافية الخلفية فقط، استخدم لوناً ذا قناة ألفا بدلاً من \`opacity\` حتى يبقى النص معتماً. القيمة الأقل من 1 تنشئ سياق تكديس. مرشح \`filter: alpha(opacity=50)\` خاص بمتصفحات IE القديمة ولا حاجة إليه للمشاريع الحديثة.`,
  ),
  createCssLesson(
    20,
    'css-length-units',
    'Length Units (وحدات الطول)',
    'اختر الوحدات المطلقة أو النسبية بحسب نوع القياس وسياق التصميم.',
    `# وحدات الطول

تشمل الوحدات المطلقة \`px\` و\`cm\` و\`mm\` و\`in\` و\`pt\`، بينما تشمل النسبية \`%\` و\`em\` و\`rem\` و\`vw\` و\`vh\` و\`vmin\` و\`vmax\`.

\`\`\`css
:root { font-size: 100%; }
.article { max-width: 70ch; padding: 1rem; }
.hero { min-height: 100svh; }
\`\`\`

ترتبط \`em\` غالباً بحجم خط العنصر أو الأب بحسب الخاصية، و\`rem\` بحجم خط الجذر. استخدم وحدات مرنة لتدعم تكبير النص والشاشات المختلفة، واختر وحدات viewport المناسبة لمتصفحات الجوال.`,
  ),
  createCssLesson(
    21,
    'css-pseudo-elements',
    'Pseudo-Elements (العناصر الكاذبة)',
    'نسق أجزاء من العنصر أو أضف زخارف باستخدام العناصر الكاذبة.',
    `# العناصر الكاذبة

تستهدف العناصر الكاذبة جزءاً من العنصر أو تنشئ صندوقاً زخرفياً:

\`\`\`css
.required::after { content: " *"; color: crimson; }
p::first-letter { font-size: 2em; }
::selection { background: #bfdbfe; }
input::placeholder { color: #64748b; }
\`\`\`

يتطلب \`::before\` و\`::after\` عادةً خاصية \`content\`. لا تضع محتوى أساسياً لا غنى عنه في زخرفة مولدة فقط؛ فقد لا يكون متاحاً لجميع التقنيات المساعدة.`,
  ),
  createCssLesson(
    22,
    'css-positioning',
    'Positioning (التموضع)',
    'حدد موضع العناصر بعلاقة إلى التدفق أو إلى حاوية مرجعية.',
    `# التموضع

القيمة الافتراضية \`static\`. يبقى \`relative\` في التدفق ويمكن إزاحته، بينما يخرج \`absolute\` من التدفق ويتموضع نسبةً إلى أقرب سلف متموضع. يتبع \`fixed\` نافذة العرض عادةً، و\`sticky\` يلتصق بعد بلوغ عتبة تمرير.

\`\`\`css
.card { position: relative; }
.badge { position: absolute; inset-block-start: 0; inset-inline-end: 0; }
\`\`\`

تتحكم \`z-index\` بالترتيب داخل سياق التكديس المناسب. يدعم CSS Anchor Positioning الحديث ربط عناصر مثل التلميحات بعنصر مرساة، لكن دعمه يعتمد على المتصفح؛ وفر بديلاً واختبر الدعم قبل الاعتماد عليه.`,
  ),
  createCssLesson(
    23,
    'css-layout-control',
    'Layout Control (التحكم في التخطيط)',
    'تحكم بنوع صندوق العنصر وظهوره، وتعرّف على field-sizing الحديث.',
    `# التحكم في التخطيط

تحدد \`display\` نوع صندوق العنصر وسلوكه: \`block\` و\`inline\` و\`inline-block\` و\`none\` وغيرها. يخفي \`display: none\` العنصر من التخطيط، بخلاف طرق الإخفاء البصري التي قد تبقيه لقارئ الشاشة. توجد قيم مثل \`table\` و\`table-cell\` لمحاكاة عرض جدولي، لكن استخدم HTML table للبيانات وGrid/Flexbox للتخطيط.

\`\`\`css
textarea { field-sizing: content; min-height: 3rem; max-height: 12rem; }
\`\`\`

تجعل \`field-sizing: content\` بعض الحقول تتمدد بحسب محتواها في المتصفحات الداعمة. وفر حدوداً للحجم وبديلًا مناسباً.`,
  ),
  createCssLesson(
    24,
    'css-grid',
    'Grid (الشبكة)',
    'أنشئ تخطيطات ثنائية الأبعاد للأعمدة والصفوف باستخدام CSS Grid.',
    `# CSS Grid

يوفر Grid تحكماً في الصفوف والأعمدة، وهو مناسب للتخطيطات ثنائية الأبعاد:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto;
  gap: 1rem;
}
\`\`\`

استخدم \`grid-template-columns\` و\`grid-template-rows\` لتعريف المسارات؛ \`grid-columns\` و\`grid-rows\` ليستا الخاصيتين الصحيحتين لهذا الغرض. تساعد \`fr\` و\`minmax()\` و\`repeat()\` في تصميم شبكة مرنة.`,
  ),
  createCssLesson(
    25,
    'css-tables',
    'Tables (تنسيق الجداول)',
    'نسق حدود الخلايا وعرض الأعمدة ومكان عنوان الجدول.',
    `# تنسيق الجداول

تحدد \`table-layout: auto\` أو \`fixed\` كيفية حساب عرض الأعمدة. تتحكم \`border-collapse\` بدمج الحدود، و\`border-spacing\` بالمسافة بينها عند استخدام الحدود المنفصلة. تحدد \`empty-cells\` إظهار الخلايا الفارغة، و\`caption-side\` موضع عنوان الجدول.

\`\`\`css
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.75rem; border: 1px solid #cbd5e1; }
caption { caption-side: bottom; }
\`\`\`

استخدم عناصر الجدول الدلالية في HTML وأبقِ الجداول مخصصة للبيانات الجدولية.`,
  ),
  createCssLesson(
    26,
    'css-transitions',
    'Transitions (الانتقالات)',
    'أضف انتقالات سلسة بين قيم الخصائص عند تفاعل المستخدم.',
    `# الانتقالات

تحدد \`transition\` الخاصية والمدة ومنحنى السرعة والتأخير:

\`\`\`css
.button { transition: background-color 200ms ease, transform 200ms ease; }
.button:hover { transform: translateY(-2px); }
\`\`\`

يمكن استخدام \`cubic-bezier()\` لتخصيص منحنى الحركة. تدعم المتصفحات الحديثة \`@starting-style\` لتعريف الحالة الابتدائية عند دخول عنصر قابل للانتقال، لكن يلزم توفير نمط أساسي وتحقق من الدعم. احترم تفضيل المستخدم \`prefers-reduced-motion\`.`,
  ),
  createCssLesson(
    27,
    'css-animations',
    'Animations (الحركات)',
    'أنشئ حركات متكررة أو متعددة المراحل باستخدام keyframes.',
    `# الحركات

تعرف \`@keyframes\` مراحل الحركة، وتستخدم خاصية \`animation\` لتطبيقها:

\`\`\`css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.element { animation: fade-in 400ms ease both; }
\`\`\`

استخدم الانتقالات للتغيرات البسيطة المرتبطة بحالة، والحركات عند الحاجة لمراحل متعددة. تجنب إضافة \`will-change\` بلا قياس؛ فقد يستهلك موارد. تتيح Scroll-driven animations ربط الحركة بالتمرير في المتصفحات الداعمة. راعِ \`prefers-reduced-motion\`.`,
  ),
  createCssLesson(
    28,
    'css-transforms-2d',
    '2D Transforms (التحويلات ثنائية الأبعاد)',
    'حرّك العناصر أو أدرها وكبّرها دون تغيير تدفق المستند.',
    `# تحويلات ثنائية الأبعاد

تتضمن التحويلات \`translate()\` للنقل و\`rotate()\` للدوران و\`scale()\` للتكبير والتصغير و\`skew()\` للإمالة:

\`\`\`css
.tile { transform: translate(10px, 5px) rotate(3deg); transform-origin: center; }
\`\`\`

تحدد \`transform-origin\` نقطة الانطلاق للتحويل. التحويل بصري ولا يغير مكان العنصر الأصلي في التدفق، وقد ينشئ سياق تكديس. استخدمه باعتدال ولا تحرك العناصر بطريقة تقلل وضوح الواجهة.`,
  ),
  createCssLesson(
    29,
    'css-transforms-3d',
    '3D Transforms (التحويلات ثلاثية الأبعاد)',
    'استخدم التحويلات ثلاثية الأبعاد مع منظور وسياق عرض مناسب.',
    `# التحويلات ثلاثية الأبعاد

تتيح \`rotateX()\` و\`rotateY()\` و\`rotateZ()\` الدوران حول المحاور. تتحكم \`perspective\` بإحساس العمق، وتحدد \`transform-style: preserve-3d\` بقاء العناصر الأبناء في الفضاء ثلاثي الأبعاد.

\`\`\`css
.scene { perspective: 800px; }
.card { transform: rotateY(12deg); backface-visibility: hidden; }
\`\`\`

تتحكم \`backface-visibility\` بظهور الوجه الخلفي. اختبر الحركة على الأجهزة المختلفة وتجنب الحركة المسببة للدوار، ووفر خيار تقليل الحركة عند الحاجة.`,
  ),
  createCssLesson(
    30,
    'css-filter-property',
    'Filter Property (خصائص الفلتر)',
    'طبّق مؤثرات بصرية على الصور والعناصر باستخدام filter.',
    `# خصائص الفلتر

تسمح \`filter\` بتطبيق مؤثرات مثل \`blur()\` و\`brightness()\` و\`contrast()\` و\`drop-shadow()\` و\`grayscale()\` و\`hue-rotate()\` و\`invert()\` و\`opacity()\` و\`saturate()\` و\`sepia()\`.

\`\`\`css
.photo { filter: grayscale(100%); }
.photo:hover { filter: none; }
\`\`\`

يمكن جمع عدة دوال في الخاصية نفسها. قد تكون الفلاتر مكلفة عند تطبيقها على مساحات كبيرة أو أثناء حركة مستمرة؛ اختبر الأداء، ولا تجعل اللون أو المؤثر الوسيلة الوحيدة لإيصال معلومة.`,
  ),
  createCssLesson(
    31,
    'css-cursor-styling',
    'Cursor Styling (تنسيق المؤشر)',
    'اختر مؤشراً يوضح طبيعة التفاعل واستخدم pointer-events بحذر.',
    `# المؤشر والتفاعل

تحدد \`cursor\` شكل مؤشر الفأرة، مثل \`pointer\` للرابط أو الزر، و\`wait\` و\`help\` و\`text\` و\`not-allowed\`. استخدم \`pointer\` للعناصر التفاعلية الحقيقية فقط.

\`\`\`css
button { cursor: pointer; }
input { caret-color: #2563eb; }
.decorative-overlay { pointer-events: none; }
\`\`\`

تحدد \`caret-color\` لون مؤشر الكتابة. تمنع \`pointer-events: none\` استقبال العنصر لأحداث المؤشر، لكنها لا تعطل كل تفاعل لوحة المفاتيح؛ لا تستخدمها كوسيلة لإدارة حالة التعطيل.`,
  ),
  createCssLesson(
    32,
    'css-box-shadow',
    'box-shadow (ظل الصندوق)',
    'أضف ظلاً خارجياً أو داخلياً وادمج عدة طبقات ظلال.',
    `# ظلال الصندوق

تكتب قيمة \`box-shadow\` بترتيب الإزاحة الأفقية والرأسية والتمويه والانتشار واللون. أضف \`inset\` للظل الداخلي، وافصل الظلال المتعددة بفواصل:

\`\`\`css
.card { box-shadow: 0 4px 12px rgb(15 23 42 / 15%); }
.control { box-shadow: 0 0 0 3px #bfdbfe, 0 0 0 5px #2563eb; }
\`\`\`

استخدم الظلال لتعزيز التسلسل البصري دون الاعتماد عليها وحدها لتحديد حدود العنصر. اختبر التباين في الأوضاع الفاتحة والداكنة.`,
  ),
  createCssLesson(
    33,
    'css-shapes-for-floats',
    'Shapes for Floats (أشكال التفاف النص)',
    'اجعل النص يلتف حول شكل مخصص باستخدام shape-outside.',
    `# الأشكال مع العناصر العائمة

تسمح \`shape-outside\` بتحديد حدود التفاف النص حول عنصر عائم:

\`\`\`css
.circle {
  float: inline-start;
  width: 10rem;
  aspect-ratio: 1;
  shape-outside: circle(50%);
  clip-path: circle(50%);
  margin-inline-end: 1rem;
}
\`\`\`

يمكن تحديد دائرة أو مضلع أو صورة مناسبة، وتضيف \`shape-margin\` مسافة بين الشكل والنص. تعمل الميزة مع العناصر العائمة، لذا ليست بديلاً عاماً عن تخطيط Grid أو Flexbox.`,
  ),
  createCssLesson(
    34,
    'css-list-styles',
    'List Styles (أنماط القوائم)',
    'نسق علامات القوائم وموضعها أو استبدلها بصورة.',
    `# أنماط القوائم

تحدد \`list-style-type\` شكل العلامة مثل \`disc\` و\`circle\` و\`square\` و\`decimal\` والأرقام الرومانية. تحدد \`list-style-position\` موضعها داخل السطر أو خارجه، ويمكن لـ \`list-style-image\` وضع صورة:

\`\`\`css
ul { list-style: square inside; }
ol { list-style-type: upper-roman; }
\`\`\`

حافظ على عناصر القائمة الدلالية في HTML حتى عند إزالة العلامات بصرياً. تحقق من محاذاة العلامات والنص في اللغتين واتجاهي الكتابة.`,
  ),
  createCssLesson(
    35,
    'css-counters',
    'Counters (العدادات)',
    'أنشئ ترقيمات CSS تلقائية أو متعددة المستويات للعناصر.',
    `# عدادات CSS

تُنشأ العدادات باستخدام \`counter-reset\`، وتزداد عبر \`counter-increment\`، ثم تعرض عبر \`counter()\` أو \`counters()\`:

\`\`\`css
body { counter-reset: chapter; }
h2::before {
  counter-increment: chapter;
  content: counter(chapter) ". ";
}
\`\`\`

يمكن استخدام \`counters()\` لعرض ترقيم متداخل. العدادات تنسيق بصري وليست بديلاً عن بنية HTML الدلالية، وقد لا تكون مناسبة عندما يجب أن تظهر الأرقام في النص المنقول أو في كل التقنيات المساعدة.`,
  ),
  createCssLesson(
    36,
    'css-functions',
    'Functions (دوال CSS)',
    'استخدم دوال CSS للحساب والتدرج وقراءة السمات واستخدام المتغيرات.',
    `# دوال CSS

تتيح \`calc()\` إجراء حسابات تمزج وحدات مختلفة، وتعيد \`var()\` قيمة خاصية مخصصة، ويمكن لـ \`attr()\` قراءة سمة في سياقات تدعم نوع القيمة:

\`\`\`css
.panel { width: calc(100% - 2rem); }
.button { color: var(--button-color, black); }
.label::after { content: attr(data-label); }
\`\`\`

توفر \`linear-gradient()\` و\`radial-gradient()\` تدرجات لونية. تأكد من توافق الوحدات في الحسابات، وأضف قيمة احتياطية مفيدة إلى \`var()\` عند احتمال غياب المتغير.`,
  ),
  createCssLesson(
    37,
    'css-variables',
    'CSS Variables (متغيرات CSS)',
    'عرّف خصائص CSS مخصصة قابلة للتوريث وإعادة الاستخدام.',
    `# متغيرات CSS

تُعرّف الخصائص المخصصة بأسماء تبدأ بشرطتين، وغالباً في \`:root\`, ثم تستخدم عبر \`var()\`:

\`\`\`css
:root { --brand: #2563eb; --space: 1rem; }
.button { background: var(--brand); padding: var(--space); }
\`\`\`

تخضع المتغيرات للتتالي والتوريث ويمكن تغييرها داخل media queries أو على مكون محدد. توفر \`var(--name, fallback)\` قيمة بديلة عند غياب المتغير. استخدم أسماء تصف الغرض مثل \`--surface-color\` بدل أسماء عامة يصعب فهمها.`,
  ),
  createCssLesson(
    38,
    'css-single-element-shapes',
    'Single Element Shapes (أشكال بعنصر واحد)',
    'كوّن أشكالاً بسيطة باستخدام الحدود ونسب الأبعاد والزوايا.',
    `# أشكال بعنصر واحد

يمكن تشكيل دائرة أو بيضاوي بتحديد نسبة أبعاد مناسبة و\`border-radius: 50%\`. أما مثلث CSS التقليدي فيمكن صنعه بحدود عنصر عرضه وارتفاعه صفر:

\`\`\`css
.circle { width: 5rem; aspect-ratio: 1; border-radius: 50%; }
.triangle {
  width: 0;
  border: 1rem solid transparent;
  border-bottom-color: royalblue;
}
\`\`\`

للأشكال الأعقد استخدم \`clip-path\` أو SVG. الأشكال المركبة مثل المكعب تتطلب وجوهاً متعددة وتحويلات، ولا تنتج عادةً من عنصر بسيط وحده.`,
  ),
  createCssLesson(
    39,
    'css-columns',
    'Columns (الأعمدة)',
    'وزع النص على أعمدة متعددة باستخدام خصائص التخطيط متعدد الأعمدة.',
    `# تخطيط الأعمدة

يمكن توزيع نص طويل في أعمدة عبر \`column-count\` أو تحديد عرض مرغوب عبر \`column-width\`. تتحكم \`column-gap\` بالمسافة، و\`column-rule\` بالخط الفاصل:

\`\`\`css
.article {
  columns: 18rem 2;
  column-gap: 2rem;
  column-rule: 1px solid #cbd5e1;
}
\`\`\`

قد يختار المتصفح عدد الأعمدة وفق العرض المتاح. راقب ترتيب القراءة والتدفق، خصوصاً للمحتوى المختلط أو الواجهات ثنائية الاتجاه.`,
  ),
  createCssLesson(
    40,
    'css-multiple-columns',
    'Multiple Columns (الأعمدة المتعددة)',
    'استخدم خاصية columns المختصرة لضبط عرض الأعمدة وعددها.',
    `# خاصية columns

تجمع \`columns\` بين \`column-width\` و\`column-count\`:

\`\`\`css
.news { columns: 16rem 3; column-gap: 1.5rem; }
\`\`\`

القيم هنا تفضيلات؛ يوزع المتصفح النص في عدد ملائم وفق المساحة. يمكن التحكم بانقسام بعض العناصر عبر \`break-inside\`، لكن تجنب إجبار عدد كبير من الأعمدة على الشاشات الضيقة. استخدم Grid إذا كان المطلوب شبكة عناصر مستقلة وليست فقرات نصية متدفقة.`,
  ),
  createCssLesson(
    41,
    'css-inline-block-layout',
    'Inline-Block Layout (تخطيط Inline-Block)',
    'افهم inline-block واستخدم أدوات التخطيط الأحدث لبناء أشرطة التنقل.',
    `# تخطيط inline-block

يجمع \`display: inline-block\` بين تدفق العناصر المضمنة وإمكان ضبط أبعاد العنصر. كان يستخدم لبناء قوائم تنقل مصطفة، لكن المسافات البيضاء في HTML قد تُنشئ فراغات بين العناصر.

\`\`\`css
.menu { display: flex; flex-wrap: wrap; gap: 1rem; }
.menu a { display: inline-block; }
\`\`\`

كان نمط \`text-align: justify\` مع عنصر كاذب \`::after\` وسيلة قديمة لمحاذاة العناصر؛ Flexbox أو Grid أوضح وأكثر موثوقية. استخدم العناصر الدلالية المناسبة لقائمة التنقل.`,
  ),
  createCssLesson(
    42,
    'css-inheritance',
    'Inheritance (الوراثة)',
    'تعرف على الخصائص الموروثة وكيفية فرض أو إلغاء الوراثة.',
    `# الوراثة في CSS

خصائص مثل \`color\` وخصائص الخط والنص تورث عادةً من الأب، بينما \`margin\` و\`padding\` لا تورث تلقائياً. يمكن التحكم بالقيم العامة عبر كلمات مثل \`inherit\` و\`initial\` و\`unset\` و\`revert\`.

\`\`\`css
.child { color: inherit; }
button { font: inherit; }
\`\`\`

لا تفرض وراثة كل الخصائص بلا حاجة؛ إذ قد تنتقل مسافات أو أبعاد غير متوقعة. افهم الخاصية المحددة ثم استخدم القيمة المناسبة.`,
  ),
  createCssLesson(
    43,
    'css-image-sprites',
    'CSS Image Sprites (صور السبرايت)',
    'تعرف على تقنية sprites القديمة ومتى يكون استخدامها غير مناسب.',
    `# صور السبرايت

تجمع تقنية CSS sprites عدة صور صغيرة في ملف واحد، ثم تعرض جزءاً منه عبر \`background-position\`:

\`\`\`css
.icon { width: 24px; height: 24px; background: url("/images/icons.png") 0 0 no-repeat; }
.icon-search { background-position: -24px 0; }
\`\`\`

قللت هذه التقنية عدد الطلبات في بعض البيئات القديمة. اليوم توفر SVG sprites وأيقونات SVG والموارد المضمنة خيارات أنسب في كثير من الحالات. لا تستخدم صورة خلفية للمحتوى الذي يحتاج نصاً بديلاً أو معنى دلالياً.`,
  ),
  createCssLesson(
    44,
    'css-clipping-masking',
    'Clipping and Masking (القص والأقنعة)',
    'قص العنصر إلى شكل أو استخدم قناعاً للتحكم في شفافية أجزائه.',
    `# القص والأقنعة

تقص \`clip-path\` الجزء المرئي من العنصر، ويمكنها استخدام أشكال مثل دائرة أو مضلع:

\`\`\`css
.avatar { clip-path: circle(50%); }
.fade { mask-image: linear-gradient(to right, black, transparent); }
\`\`\`

تستخدم الأقنعة ألفا أو اللمعان لتحديد الشفافية. يبقى المحتوى الدلالي موجوداً حتى إن قُص بصرياً، لذا اختبر التركيز والتفاعل. تحقق من دعم المتصفحات، وقدم شكلاً أساسياً صالحاً دون المؤثر عند الحاجة.`,
  ),
  createCssLesson(
    45,
    'css-fragmentation',
    'Fragmentation (تجزئة المحتوى والطباعة)',
    'تحكم بانقسام المحتوى بين الصفحات والأعمدة باستخدام break properties.',
    `# تجزئة المحتوى

تحدد خصائص الانقسام كيفية توزيع العناصر عبر صفحات الطباعة أو الأعمدة. استخدم الخصائص الحديثة مثل \`break-inside\` و\`break-before\` بدلاً من الأسماء القديمة:

\`\`\`css
@media print {
  .card { break-inside: avoid; }
  h2 { break-before: page; }
}
\`\`\`

كانت \`page-break-inside\` و\`page-break-before\` أسماء قديمة ولا تزال مدعومة كمرادفات في متصفحات كثيرة. اختبر معاينة الطباعة؛ فالمحتوى الطويل قد لا يمكن إبقاؤه كاملاً في صفحة واحدة.`,
  ),
  createCssLesson(
    46,
    'css-object-model',
    'CSS Object Model (CSSOM)',
    'تعرف على تمثيل CSS في المتصفح، وتجنب تعديل أوراق الأنماط دون داعٍ.',
    `# نموذج كائنات CSS

يمثل CSSOM أوراق الأنماط وقواعدها ضمن واجهات JavaScript، إلى جانب DOM الذي يمثل المستند. يمكن قراءة القواعد من \`document.styleSheets\`، وقد تمنع قيود الأصل قراءة أوراق خارجية.

\`\`\`js
element.style.setProperty("--accent", "royalblue");
const color = getComputedStyle(element).color;
\`\`\`

يمكن لـ \`insertRule()\` إضافة قاعدة إلى ورقة أنماط، لكن تغيير class أو custom property عادةً أوضح وأكثر أماناً للصيانة. لا تفترض إمكانية قراءة كل قواعد CSS المحملة عبر مصادر مختلفة.`,
  ),
  createCssLesson(
    47,
    'css-feature-queries',
    'Feature Queries (استعلامات الميزات)',
    'استخدم @supports لتطبيق تنسيقات عند دعم المتصفح لميزة محددة.',
    `# استعلامات الميزات

تتحقق \`@supports\` من دعم المتصفح لخاصية أو مجموعة قواعد قبل تطبيقها:

\`\`\`css
.container { display: block; }
@supports (display: grid) {
  .container { display: grid; }
}
\`\`\`

يمكن دمج الشروط عبر \`and\` و\`or\` و\`not\`. ابدأ بتنسيق أساسي عملي ثم أضف التحسينات المدعومة. وجود الخاصية لا يضمن وحده سلامة تجربة المستخدم كاملة، لذلك اختبر السلوك الفعلي.`,
  ),
  createCssLesson(
    48,
    'css-stacking-context',
    'Stacking Context (سياق التكديس)',
    'افهم لماذا لا تكفي قيمة z-index عالية دائماً لتقديم عنصر أمام الجميع.',
    `# سياق التكديس

ترتب المتصفحات العناصر في محاور التكديس. قد تنشأ سياقات تكديس جديدة بسبب خصائص مثل \`position\` مع \`z-index\`، أو \`opacity\` الأقل من 1، أو \`transform\` وخصائص أخرى.

\`\`\`css
.dialog { position: fixed; z-index: 10; }
.dialog-backdrop { position: fixed; inset: 0; z-index: 9; }
\`\`\`

لا تقارن \`z-index\` لعنصرين من سياقين مختلفين وكأنهما في مستوى واحد؛ قد يكون العنصر محصوراً داخل سياق أبيه. نظم طبقات الصفحة بتدرج واضح وتجنب أرقاماً ضخمة عشوائية.`,
  ),
  createCssLesson(
    49,
    'css-block-formatting-context',
    'Block Formatting Contexts (سياق تنسيق الكتلة)',
    'تعرف على سياقات التنسيق المستقلة ودورها في العوام والهوامش.',
    `# سياق تنسيق الكتلة

ينشئ Block Formatting Context منطقة تخطيط مستقلة تؤثر في تعامل العناصر مع العوام والهوامش. من وسائل إنشائه \`display: flow-root\`، وبعض قيم \`overflow\`، والعوام، والتموضع المطلق أو الثابت.

\`\`\`css
.card { display: flow-root; }
\`\`\`

يعد \`flow-root\` خياراً مباشراً لاحتواء العناصر العائمة دون آثار جانبية للتمرير أو القص التي قد تنتج عن \`overflow: hidden\`. يعتمد الخيار الأنسب على التخطيط المطلوب.`,
  ),
  createCssLesson(
    50,
    'css-vertical-centering',
    'Vertical Centering (التوسيط الرأسي)',
    'وسّط المحتوى رأسياً باستخدام Grid أو Flexbox أو طرق تموضع مناسبة.',
    `# التوسيط الرأسي

لتوسيط عنصر داخل حاوية، استخدم Grid أو Flexbox عندما يلائمان البنية:

\`\`\`css
.panel { display: grid; place-items: center; min-height: 20rem; }
.row { display: flex; align-items: center; }
\`\`\`

يمكن استخدام التموضع مع transform للتراكب، لكن العنصر يخرج عندها من التدفق. كانت \`display: table-cell\` و\`line-height\` مساوي للارتفاع حيل شائعة؛ لا تناسب غالباً المحتوى متعدد الأسطر أو التخطيطات المرنة.`,
  ),
  createCssLesson(
    51,
    'css-object-fit-placement',
    'Object Fit and Placement (ملاءمة الكائنات)',
    'تحكم بكيفية احتواء الصور والفيديو داخل صندوق ذي أبعاد محددة.',
    `# object-fit وobject-position

تحدد \`object-fit\` كيفية ملاءمة صورة أو فيديو داخل صندوقه:

- \`fill\` يمدد المحتوى وقد يغير نسبته.
- \`contain\` يعرضه كاملاً مع احتمال ترك فراغ.
- \`cover\` يغطي الصندوق مع احتمال القص.
- \`none\` يحافظ على الحجم الأصلي، و\`scale-down\` يختار الأصغر بين none وcontain.

\`\`\`css
.thumbnail { width: 12rem; height: 8rem; object-fit: cover; object-position: center; }
\`\`\`

استخدم \`object-position\` لاختيار موضع الجزء الظاهر بعد القص.`,
  ),
  createCssLesson(
    52,
    'css-design-patterns',
    'CSS Design Patterns (أنماط تصميم CSS)',
    'نظم أسماء الفئات باستخدام BEM وأنماط تساعد على وضوح المكونات.',
    `# أنماط تصميم CSS

يساعد BEM على تسمية الكتل والعناصر والمعدلات بطريقة واضحة:

\`\`\`html
<form class="form form--featured">
  <input class="form__input" type="text">
  <button class="form__submit form__submit--disabled" type="submit">إرسال</button>
</form>
\`\`\`

تسمى الكتلة \`form\`، والعنصر \`form__input\`، والمعدل \`form--featured\`. BEM اتفاقية اختيارية وليست جزءاً من CSS؛ اختر نمطاً متسقاً يناسب المشروع، ولا تكرر حالة العنصر في الاسم إذا كان بالإمكان تمثيلها بوضوح.`,
  ),
  createCssLesson(
    53,
    'css-browser-support-prefixes',
    'Browser Support and Prefixes (دعم المتصفحات والبادئات)',
    'تحقق من دعم خصائص CSS واستخدم البادئات فقط عند الحاجة.',
    `# دعم المتصفحات والبادئات

كانت البادئات مثل \`-webkit-\` و\`-moz-\` و\`-ms-\` تستخدم لتجريب خصائص قبل توحيدها. لا تضفها يدوياً لكل قاعدة بشكل عشوائي؛ افحص مصفوفة المتصفحات المستهدفة واستعمل أداة بناء مثل Autoprefixer عند الحاجة.

\`\`\`css
.panel { display: flex; }
\`\`\`

لا تعني البادئة أن الخاصية تعمل كما هو متوقع في كل إصدار. اختبر المتصفحات المطلوبة، واستخدم \`@supports\` عند الحاجة إلى مسار بديل.`,
  ),
  createCssLesson(
    54,
    'css-normalizing-browser-styles',
    'Normalizing Browser Styles (توحيد الأنماط الافتراضية)',
    'قلل اختلافات الأنماط الافتراضية بين المتصفحات مع الحفاظ على سهولة الوصول.',
    `# توحيد الأنماط الافتراضية

تختلف بعض الأنماط الافتراضية بين المتصفحات. توفر ملفات normalize قواعد لتقليل الاختلافات مع الحفاظ على السلوك المفيد، بينما يزيل reset كثيراً من الأنماط الافتراضية ويترك للمشروع إعادة تعريفها.

\`\`\`css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
\`\`\`

اختر إعداداً مناسباً للمشروع بدلاً من نسخ ملف عشوائي. لا تزل مؤشرات التركيز أو أنماط عناصر النماذج دون بدائل واضحة.`,
  ),
  createCssLesson(
    55,
    'css-internet-explorer-hacks',
    'Internet Explorer Hacks (حيل Internet Explorer القديمة)',
    'تعرف على حيل التوافق التاريخية وتجنب إدخالها في مشاريع حديثة.',
    `# حيل Internet Explorer التاريخية

استخدمت مواقع قديمة قواعد خاصة مثل \`*display: inline\` لـ IE6/7 وكتل \`@media\` غير معيارية لـ IE8. هذه حيل متقادمة وليست CSS موصى بها:

\`\`\`css
/* مثال تاريخي فقط؛ لا تستخدمه في مشروع حديث */
@media screen and (-ms-high-contrast: active) {
  /* معالجة خاصة ببيئات قديمة */
}
\`\`\`

انتهى دعم Internet Explorer المكتبي. إذا كنت تصون نظاماً قديماً، اعزل قواعد التوافق ووثق سببها، ولا تضفها إلى تطبيق جديد.`,
  ),
  createCssLesson(
    56,
    'css-performance',
    'Performance (أداء CSS والحركات)',
    'حسّن سلاسة الواجهة بقياس الأداء واختيار خصائص الحركة المناسبة.',
    `# أداء CSS

قد تسبب بعض التغييرات إعادة حساب التخطيط والرسم. عند تحريك عنصر، يكون \`transform\` و\`opacity\` غالباً خيارين جيدين للحركة السلسة:

\`\`\`css
.box { transition: transform 300ms ease; }
.box.active { transform: translate(100px, 100px); }
@media (prefers-reduced-motion: reduce) {
  .box { transition: none; }
}
\`\`\`

لا تضف \`translate3d(0, 0, 0)\` أو \`will-change\` لكل العناصر كحيلة عامة؛ قد يزيد ذلك استهلاك الذاكرة. قس الأداء بأدوات المطورين، وقلل المؤثرات المكلفة على العناصر الكبيرة.`,
  ),

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
    title: 'المصفوفات ودوال المصفوفات (map, filter, reduce)',
    readTimeMinutes: 10,
    summary: 'إنشاء القوائم وتعديلها والبحث فيها وتحويلها باستخدام map وfilter وreduce وغيرها.',
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

const javascriptLessonContent: Record<string, string> = {
  'js-variables-and-data-types': `# الفصل الثاني: أساسيات JavaScript

## قواعد كتابة الكود

JavaScript حساسة لحالة الأحرف: \`score\` و\`Score\` اسمان مختلفان. المسافات تنظم الكود، والتعليقات تشرح السبب أو الفكرة:

\`\`\`javascript
// تعليق لسطر واحد
/*
  تعليق متعدد الأسطر
*/
const learnerName = "سلمى";
\`\`\`

الفاصلة المنقوطة اختيارية في مواضع كثيرة بسبب الإضافة التلقائية ASI؛ اتبع أسلوباً ثابتاً في المشروع.

## المتغيرات: var وlet وconst

| الكلمة | النطاق | إعادة الإسناد | الاستخدام |
|---|---|---|---|
| \`const\` | كتلة | لا | الافتراضي عندما لن تعيد إسناد المتغير |
| \`let\` | كتلة | نعم | قيمة تتغير مثل العدّاد |
| \`var\` | دالة | نعم | أسلوب قديم؛ تجنبه في الكود الجديد |

\`\`\`javascript
const academyName = "Code Academy";
let score = 0;
score += 10;

const skills = ["HTML"];
skills.push("JavaScript"); // مسموح: const تمنع إعادة الإسناد لا تعديل المحتوى
\`\`\`

## أنواع البيانات

| المجموعة | الأنواع | مثال |
|---|---|---|
| بدائية | \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, \`bigint\` | \`"مرحبا"\`, \`42\`, \`true\` |
| كائنات | \`object\`، ومنها المصفوفات والدوال | \`{ name: "ليلى" }\` |

تُستخدم \`typeof\` لمعرفة النوع. ملاحظة تاريخية: \`typeof null\` يعيد \`"object"\`.

## المعاملات والتحويل

تشمل المعاملات الحسابية \`+\` و\`-\` و\`*\` و\`/\`، والإسناد \`=\` و\`+=\`، والمقارنة \`===\` و\`!==\`، والمنطق \`&&\` و\`||\` و\`!\`. استخدم المقارنة الصارمة غالباً.

| التعبير | النتيجة | السبب |
|---|---|---|
| \`"3" + 4\` | \`"34"\` | جمع نصي |
| \`Number("3") + 4\` | \`7\` | تحويل صريح |
| \`3 == "3"\` | \`true\` | تحويل ضمني |
| \`3 === "3"\` | \`false\` | النوع مختلف |

القيم falsy: \`false\` و\`0\` و\`-0\` و\`0n\` و\`""\` و\`null\` و\`undefined\` و\`NaN\`. أما \`[]\` و\`{}\` فقيم truthy.

## الشروط والحلقات

\`\`\`javascript
const grade = 82;
if (grade >= 90) console.log("ممتاز");
else if (grade >= 60) console.log("ناجح");
else console.log("حاول مرة أخرى");

for (let i = 0; i < 3; i++) console.log(i);
\`\`\`

| البناء | الاستخدام |
|---|---|
| \`if/else\` | تنفيذ مسارات بحسب الشروط |
| \`switch\` | الاختيار بين حالات لقيمة واحدة |
| \`for\` و\`while\` | تكرار مع تحكم واضح بشرط التوقف |
| \`do...while\` | تنفيذ الجسم مرة على الأقل |
| \`for...of\` | المرور على قيم المصفوفات والنصوص |
| \`for...in\` | المرور على مفاتيح الكائنات؛ ليس الخيار المعتاد للمصفوفات |

يوقف \`break\` الحلقة، وتتجاوز \`continue\` التكرار الحالي. استخدم JSDoc لتوثيق الدوال العامة أو المعقدة، واكتب تعليقات تشرح القرارات لا الأسطر الواضحة.`,
  'js-functions-and-scope': `# الفصل الثالث: الدوال في JavaScript

الدالة وحدة تنفذ مهمة واضحة، وتساعد على إعادة استخدام المنطق واختباره.

## الإعلان والتعبير

\`\`\`javascript
function greet(name) {
  return \`أهلاً \${name}\`;
}

const double = function (number) {
  return number * 2;
};
\`\`\`

| النوع | الاستدعاء قبل التعريف | ملاحظات |
|---|---|---|
| Function Declaration | ممكن | يرفع تعريف الدالة |
| Function Expression | غير ممكن قبل تهيئة المتغير | يتبع قواعد \`let\` أو \`const\` |
| Arrow Function | غير ممكن قبل تهيئة المتغير | صيغة مختصرة وترث \`this\` |

## Arrow Functions والمعاملات

\`\`\`javascript
const multiply = (a, b) => a * b; // إرجاع ضمني
const greetStudent = name => \`أهلاً \${name}\`;
const sum = (a = 0, b = 0) => a + b; // قيم افتراضية
\`\`\`

المعاملات Parameters أسماء في تعريف الدالة، والوسائط Arguments هي القيم عند استدعائها. يجمع rest القيم في مصفوفة، بينما ينشر spread عناصر مصفوفة:

\`\`\`javascript
function total(...prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}
const allPrices = [10, 20, ...[30]];
\`\`\`

الدوال السهمية لا تملك \`this\` أو \`arguments\` خاصين بها، لذا لا تستبدل بها كل الدوال العادية.

## النطاق والإغلاق

النطاق العام متاح على مستوى الوحدة أو البيئة، ونطاق الدالة داخل الدالة، ونطاق الكتلة داخل \`{}\` مع \`let\` و\`const\`.

الإغلاق Closure هو احتفاظ الدالة بالنطاق الخارجي الذي أنشئت فيه:

\`\`\`javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
\`\`\`

تأخذ الدوال عالية الرتبة دوالاً كوسائط أو تعيد دوالاً. والـ Callback دالة تمرر لتنفذ لاحقاً، مثل \`map\` أو مستمع حدث. أما IIFE فتعبير دالي ينفذ فوراً؛ تستخدم Modules الحديثة غالباً بدلاً منه لإنشاء نطاق مستقل.`,
  'js-arrays-and-objects-methods': `# الفصل الخامس: المصفوفات ودوالها

المصفوفة قائمة مرتبة يبدأ فهرسها من الصفر. استخدم \`[]\` للإنشاء و\`at(-1)\` للوصول إلى العنصر الأخير:

\`\`\`javascript
const skills = ["HTML", "CSS", "JavaScript"];
console.log(skills[0]); // HTML
console.log(skills.at(-1)); // JavaScript
\`\`\`

## التعديل والطرق الشائعة

| الطريقة | ماذا تفعل؟ | تعدل الأصل؟ |
|---|---|---|
| \`push\` / \`pop\` | إضافة/إزالة من النهاية | نعم |
| \`unshift\` / \`shift\` | إضافة/إزالة من البداية | نعم |
| \`splice\` | حذف أو إدراج داخل المصفوفة | نعم |
| \`slice\` | نسخ جزء من المصفوفة | لا |
| \`concat\` | دمج مصفوفات | لا |
| \`includes\` / \`indexOf\` | اختبار وجود قيمة أو موقعها | لا |

## التحويل والبحث

\`\`\`javascript
const prices = [10, 20, 30];
const withTax = prices.map(price => price * 1.15);
const expensive = prices.filter(price => price >= 20);
const total = prices.reduce((sum, price) => sum + price, 0);
\`\`\`

| الطريقة | النتيجة |
|---|---|
| \`map\` | مصفوفة جديدة بالقيم المحولة |
| \`filter\` | مصفوفة جديدة بالعناصر المطابقة |
| \`reduce\` | قيمة واحدة مجمعة |
| \`find\` / \`findIndex\` | أول عنصر مطابق أو فهرسه |
| \`some\` / \`every\` | هل يطابق بعض العناصر / جميعها؟ |
| \`flat\` / \`flatMap\` | تسطيح مستويات أو تحويل ثم تسطيح |
| \`forEach\` | تنفيذ دالة لكل عنصر دون إنشاء نتيجة جديدة |

ترتب \`sort()\` العناصر كنص افتراضياً؛ مرر دالة مقارنة للأرقام:

\`\`\`javascript
[10, 2, 30].sort((a, b) => a - b); // [2, 10, 30]
\`\`\`

تذكر أن \`sort\` و\`reverse\` يعدلان المصفوفة الأصلية. يمكن نسخها أولاً باستخدام \`[...items]\`. تدعم المصفوفات المتداخلة البيانات متعددة الأبعاد، ويسمح تفكيك المصفوفة باستخراج قيمها: \`const [first, second] = skills;\`.`,
  'dom-manipulation-and-events': `# الفصل السادس: التعامل مع DOM

DOM واجهة تمثل HTML كشجرة من الكائنات. بواسطتها تختار JavaScript العناصر وتغير المحتوى أو السمات أو الفئات أو تنشئ عناصر جديدة.

## اختيار العناصر

| الطريقة | النتيجة |
|---|---|
| \`getElementById\` | عنصر واحد بمعرف |
| \`getElementsByClassName\` / \`getElementsByTagName\` | مجموعة حية تتحدث عند تغير DOM |
| \`querySelector\` | أول عنصر يطابق محدد CSS |
| \`querySelectorAll\` | مجموعة ثابتة من العناصر المطابقة |

\`\`\`javascript
const title = document.querySelector("#page-title");
title.textContent = "أهلاً بك";
title.classList.add("highlight");
title.setAttribute("aria-live", "polite");
\`\`\`

استخدم \`textContent\` للنص. لا تضع مدخلات المستخدم غير الموثوقة في \`innerHTML\`؛ فقد يؤدي ذلك إلى XSS. استخدم \`createElement\` و\`textContent\` لبناء عناصر آمنة.

## إنشاء العناصر والأحداث

\`\`\`javascript
const list = document.querySelector("#lessons");
const item = document.createElement("li");
item.textContent = "درس JavaScript";
list.append(item);

list.addEventListener("click", event => {
  if (event.target.matches("li")) {
    console.log("تم اختيار:", event.target.textContent);
  }
});
\`\`\`

تسمى ربط مستمع واحد بالأب لمعالجة أحداث الأبناء **تفويض الأحداث**. تنتشر معظم الأحداث من العنصر إلى أسلافه في مرحلة bubbling، ويمكن الاستماع أثناء capturing بخيار مناسب. استخدم \`event.preventDefault()\` لإلغاء السلوك الافتراضي عند الحاجة، و\`stopPropagation()\` فقط عندما يكون إيقاف الانتشار مقصوداً.

عند إنشاء عناصر كثيرة استخدم \`DocumentFragment\` ثم أضفه دفعة واحدة. أزل مستمعي الأحداث عند انتهاء الحاجة إليهم لتجنب احتفاظ الذاكرة بعناصر لم تعد مستخدمة.`,
  'async-await-and-fetching-apis': `# الفصل السابع: JavaScript غير المتزامنة

الكود المتزامن ينفذ بالترتيب. أما العمليات البطيئة مثل الشبكة والمؤقتات فتعيد نتيجة لاحقاً؛ لا تنتظر JavaScript الشبكة بحجب واجهة المستخدم.

## من Callback إلى Promise

| النمط | الفكرة | التحدي |
|---|---|---|
| Callback | تمرير دالة لتعمل لاحقاً | التداخل العميق يصعب القراءة |
| Promise | يمثل نتيجة مستقبلية ناجحة أو مرفوضة | سلسلة \`then/catch\` |
| \`async/await\` | صياغة مقروءة فوق Promises | يلزم التعامل مع الرفض |

للوعد ثلاث حالات: pending ثم fulfilled أو rejected. تستخدم \`then\` للنجاح و\`catch\` للفشل و\`finally\` للتنظيف.

\`\`\`javascript
async function loadUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("تعذر تحميل المستخدمين");
  return response.json();
}
\`\`\`

\`fetch\` يرفض عند أخطاء الشبكة، لكنه لا يرفض تلقائياً لكل استجابة HTTP مثل 404؛ افحص \`response.ok\`. استخدم \`try/catch\` لعرض حالة خطأ مفهومة.

## تنسيق عدة وعود

| الوسيلة | السلوك |
|---|---|
| \`Promise.all\` | تنتظر الجميع وترفض إذا رفض أحدها |
| \`Promise.race\` | تستقر عند أول وعد يستقر |
| \`Promise.allSettled\` | تنتظر الجميع وتعيد حالة كل وعد |

لإرسال POST، مرر \`method\` و\`headers\` و\`body\` بصيغة مناسبة. يمكن استخدام \`AbortController\` لإلغاء طلب لم تعد بحاجة إليه. يستخدم debounce لتأخير تنفيذ البحث حتى يتوقف المستخدم عن الكتابة، وthrottle لتقييد عدد مرات التنفيذ. لا تعِد المحاولة بلا حد؛ ضع حداً زمنياً وعدداً أقصى للمحاولات.`,
};

const additionalJavaScriptLessons: ILesson[] = [
  createJavaScriptLesson(
    1,
    'js-introduction',
    'الفصل الأول: مقدمة في JavaScript',
    'تعرف على دور JavaScript والفرق بينها وبين ECMAScript وإعداد بيئة التطوير وربطها بصفحة HTML.',
    `# الفصل الأول: مقدمة في JavaScript

## ما دور JavaScript؟

تخيّل صفحة الويب كمنزل:

| التقنية | تشبيهها | دورها |
|---|---|---|
| HTML | الهيكل والغرف | تنظيم المحتوى ومعناه |
| CSS | الطلاء والأثاث | المظهر والتخطيط |
| JavaScript | الحركة والتحكم | التفاعل والمنطق وتحديث البيانات |

تعمل JavaScript في المتصفح للتفاعل مع الصفحة، ويمكن تشغيلها أيضاً خارج المتصفح باستخدام بيئات مثل Node.js.

## JavaScript وECMAScript

ECMAScript هو المعيار الذي يحدد مواصفات اللغة الأساسية. أما JavaScript فهي تطبيق عملي له، وتوفر بيئة التشغيل واجهات إضافية:

| الجزء | أمثلة |
|---|---|
| مواصفات اللغة | المتغيرات، الدوال، المصفوفات، الأصناف |
| واجهات المتصفح | \`document\` وDOM و\`fetch\` و\`localStorage\` |
| واجهات Node.js | نظام الملفات والخوادم والوحدات الخاصة بـNode |

لا تخلط بين خاصية من اللغة وواجهة يوفرها المتصفح؛ \`Array.map()\` من اللغة، بينما \`document.querySelector()\` من واجهات المتصفح.

## لمحة تاريخية وبيئة العمل

ظهرت JavaScript عام 1995، ثم بدأ توحيد مواصفاتها عبر ECMA International. كان تحديث ES2015، المعروف أيضاً باسم ES6، نقطة تحول كبيرة، ومنذ ذلك الوقت تصدر تحديثات للمواصفات بصورة منتظمة.

للبداية تحتاج إلى محرر مثل VS Code، ومتصفح حديث وأدوات المطور Developer Tools. أضف Node.js عند الحاجة لتشغيل الكود خارج المتصفح، ثم Git وأدوات مثل ESLint وPrettier عندما يكبر المشروع.

## ربط JavaScript بصفحة HTML

\`\`\`html
<script src="/scripts/app.js" defer></script>
\`\`\`

الملف الخارجي هو الخيار المفضل. مع \`defer\` ينزل الملف بالتوازي وينفذ بعد تحليل HTML، وتحافظ السكربتات المؤجلة على ترتيبها. يمكن استخدام \`async\` لسكربت مستقل لا يعتمد على ترتيب ملفات أخرى.

\`\`\`html
<script>
  console.log("أهلاً من الصفحة");
</script>
\`\`\`

يناسب الكود الداخلي الأمثلة الصغيرة، بينما سمة مثل \`onclick\` تخلط البنية بالسلوك ويفضل تجنبها. استخدم \`addEventListener\` في ملف منفصل.

| الطريقة | الاستخدام |
|---|---|
| ملف خارجي مع \`defer\` | معظم المشاريع، منظم ويعمل بعد تحليل الصفحة |
| \`<script>\` داخلي | تجربة قصيرة أو مثال صغير |
| سمة مثل \`onclick\` | تجنبها في المشاريع لأنها تخلط HTML بالسلوك |

## أول برنامج

\`\`\`javascript
const learner = "أنت";
console.log(\`مرحباً \${learner}!\`);
\`\`\`

افتح Developer Tools ثم تبويب Console لرؤية النتيجة. في الدروس القادمة سنضيف الأنواع والشروط والدوال ونبني برامج مفيدة خطوة بخطوة.`,
    {
      instructions: 'عرّف متغيراً باسم learnerName ثم اطبع رسالة ترحيب تستخدم قيمته داخل template literal.',
      initialJs: `// أنشئ متغير learnerName
// اطبع رسالة ترحيب باستخدام console.log`,
      solution: `const learnerName = "ليلى";
console.log(\`مرحباً \${learnerName}!\`);`,
    },
    {
      question: 'ما فائدة defer عند ربط ملف JavaScript في head؟',
      options: [
        'تحميل الملف بالتوازي ثم تنفيذه بعد تحليل HTML.',
        'تشغيل الملف قبل تحميل HTML دائماً.',
        'تحويل JavaScript إلى CSS.',
        'منع الملف من استخدام DOM.',
      ],
      correctIndex: 0,
      explanation: 'تسمح defer بتنزيل السكربت بالتوازي، ثم تشغيله بعد تحليل المستند مع الحفاظ على ترتيب السكربتات المؤجلة.',
    }
  ),
  createJavaScriptLesson(
    4,
    'js-objects-and-oop',
    'الفصل الرابع: الكائنات والبرمجة كائنية التوجه',
    'أنشئ الكائنات وأدر خصائصها، وافهم this وprototype وClasses وJSON.',
    `# الفصل الرابع: الكائنات والبرمجة كائنية التوجه

الكائن يجمع البيانات والسلوك في أزواج مفتاح وقيمة:

\`\`\`javascript
const student = {
  name: "عمر",
  level: "مبتدئ",
  introduce() {
    return \`أنا \${this.name}\`;
  },
};

student.city = "القاهرة";
console.log(student["level"]);
\`\`\`

استخدم النقطة للخصائص المعروفة، والأقواس عندما يكون اسم المفتاح متغيراً. تدعم الكائنات الاختصار \`{ name }\` والأسماء المحسوبة \`{ [key]: value }\` والجالبات والمحددات.

## this وطرق الكائن

في الطريقة العادية يشير \`this\` عادةً إلى الكائن الذي استدعى الطريقة. أما الدالة السهمية فترث \`this\` من النطاق المحيط. يمكن ضبطه صراحةً باستخدام \`call\` أو \`apply\` أو \`bind\`.

## النماذج الأولية وClasses

تعتمد JavaScript على سلسلة النماذج الأولية Prototype. صياغة \`class\` واجهة أوضح لإنشاء الكائنات والوراثة:

\`\`\`javascript
class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  greet() {
    return \`أهلاً، أنا \${this.#name}\`;
  }
}

class Student extends Person {
  constructor(name, course) {
    super(name);
    this.course = course;
  }
}
\`\`\`

تتيح \`extends\` الوراثة و\`super\` استدعاء المُنشئ الأب. الحقول التي تبدأ بـ\`#\` خاصة ولا يمكن الوصول إليها خارج الصنف. ظهرت الحقول الخاصة القياسية في ES2022.

| الطريقة | الاستخدام |
|---|---|
| \`Object.keys\` / \`Object.values\` | قراءة المفاتيح أو القيم |
| \`Object.assign\` | نسخ خصائص سطحية إلى كائن |
| \`Object.create\` | إنشاء كائن بنموذج أولي محدد |
| \`Object.freeze\` | منع تغييرات مباشرة سطحية |

## JSON

JSON صيغة نصية لتبادل البيانات، وليست هي الكائن نفسه:

\`\`\`javascript
const text = JSON.stringify({ name: "عمر" });
const data = JSON.parse(text);
\`\`\`

تأكد من معالجة أخطاء \`JSON.parse\` عند استقبال بيانات غير مضمونة، ولا تعتمد على \`freeze\` لحماية عميقة للكائنات المتداخلة.`,
    {
      instructions: 'أنشئ class باسم Student بحقل خاص للاسم ودالة تعيد رسالة ترحيب. جرّب إنشاء طالب وطباعة الرسالة.',
      initialJs: `// اكتب class Student هنا
// أنشئ كائناً واطبع رسالة الترحيب`,
      solution: `class Student {
  #name;
  constructor(name) {
    this.#name = name;
  }
  greet() {
    return \`أهلاً، أنا \${this.#name}\`;
  }
}

const student = new Student("عمر");
console.log(student.greet());`,
    },
    {
      question: 'ما الذي تضمنه الخاصية التي يبدأ اسمها بـ # داخل class؟',
      options: [
        'أنها خاصة ولا يمكن الوصول إليها مباشرة من خارج الصنف.',
        'أنها تتحول تلقائياً إلى نص.',
        'أنها تصبح ثابتة في كل الكائنات.',
        'أنها متاحة عالمياً.',
      ],
      correctIndex: 0,
      explanation: 'الحقول الخاصة التي تبدأ بـ # لا يمكن الوصول إليها إلا من داخل تعريف الصنف.',
    }
  ),
  createJavaScriptLesson(
    8,
    'js-error-handling',
    'الفصل الثامن: معالجة الأخطاء',
    'التقط الأخطاء بوضوح، وأنشئ أخطاء مخصصة، وتعامل مع فشل الوعود.',
    `# الفصل الثامن: معالجة الأخطاء

تساعد معالجة الأخطاء على إظهار نتيجة مفهومة بدلاً من توقف المسار دون تفسير.

\`\`\`javascript
try {
  const value = JSON.parse('{"score": 90}');
  console.log(value.score);
} catch (error) {
  console.error("تعذر قراءة البيانات:", error.message);
} finally {
  console.log("انتهت محاولة القراءة");
}
\`\`\`

\`catch\` يعالج الاستثناء، و\`finally\` ينفذ سواء نجحت العملية أم فشلت، لذلك يناسب تحرير الموارد. استخدم \`throw new Error("رسالة")\` بدلاً من رمي نصوص عشوائية.

## أنواع الأخطاء الشائعة

| النوع | مثال على السبب |
|---|---|
| \`SyntaxError\` | كتابة غير صالحة نحوياً |
| \`ReferenceError\` | استخدام اسم غير معرّف |
| \`TypeError\` | عملية غير مناسبة لنوع القيمة |
| \`RangeError\` | قيمة خارج المجال المقبول |

لأخطاء المجال أنشئ صنفاً يرث من \`Error\`:

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
\`\`\`

## الوعود والأخطاء

استخدم \`.catch()\` مع Promise أو \`try/catch\` داخل \`async\` function. تذكر أن \`fetch\` يحتاج فحص \`response.ok\` لمعالجة استجابات HTTP الفاشلة.

في المتصفح يمكن مراقبة الأخطاء العامة عبر \`window.onerror\` و\`unhandledrejection\`، وفي Node.js توجد واجهات للعملية. هذه أدوات تسجيل احتياطية وليست بديلاً عن معالجة الخطأ قرب مصدره. لا تبتلع الخطأ بصمت، ولا تعرض للمستخدم تفاصيل داخلية حساسة؛ سجّل التفاصيل المناسبة واعرض رسالة عملية.`,
    {
      instructions: 'اكتب دالة تتحقق من أن العمر رقم موجب، وارمِ ValidationError عند القيمة غير الصحيحة ثم التقط الخطأ.',
      initialJs: `class ValidationError extends Error {
  // أكمل الصنف
}

function validateAge(age) {
  // تحقق من العمر وارمِ خطأ عند عدم صلاحيته
}

try {
  validateAge(-2);
} catch (error) {
  console.log(error.name, error.message);
}`,
      solution: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (!Number.isFinite(age) || age <= 0) {
    throw new ValidationError("العمر يجب أن يكون رقماً موجباً");
  }
  return age;
}

try {
  validateAge(-2);
} catch (error) {
  console.log(error.name, error.message);
}`,
    },
    {
      question: 'متى تنفذ كتلة finally في try/catch؟',
      options: [
        'بعد انتهاء المحاولة سواء نجحت أو وقع خطأ.',
        'فقط عند حدوث SyntaxError.',
        'فقط إذا لم يحدث أي خطأ.',
        'قبل تنفيذ كتلة try.',
      ],
      correctIndex: 0,
      explanation: 'تستخدم finally للتنظيف أو الأعمال التي يجب أن تنفذ سواء نجحت العملية أو فشلت.',
    }
  ),
  createJavaScriptLesson(
    9,
    'js-es6-plus-features',
    'الفصل التاسع: ميزات JavaScript الحديثة (ES6+)',
    'استخدم القوالب النصية والتفكيك وModules وMap وSet والميزات الحديثة بأمان.',
    `# الفصل التاسع: ميزات JavaScript الحديثة

## القوالب النصية والتفكيك

تستخدم Template Literals العلامة \`\`\` وتدعم إدراج التعبيرات والأسطر المتعددة:

\`\`\`javascript
const name = "ليلى";
const message = \`أهلاً \${name}
في دورة JavaScript\`;

const student = { name, level: "مبتدئ" };
const { level } = student;
const [first, second] = ["HTML", "CSS"];
\`\`\`

تدعم الدوال معاملات افتراضية، ويجمع rest العناصر بينما ينشر spread نسخة أو عناصر:

\`\`\`javascript
const updated = { ...student, level: "متوسط" };
const greet = (person = "صديق") => \`مرحباً \${person}\`;
\`\`\`

## الوحدات Modules

\`\`\`javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from "./math.js";
\`\`\`

توجد exports مسماة وexport افتراضي. تقسم الوحدات المشروع إلى ملفات ذات مسؤولية واضحة، وغالباً تعمل في المتصفح مع \`type="module"\`.

## Map وSet وSymbol

| البنية | ما الذي تخزنه؟ | فائدة |
|---|---|---|
| \`Map\` | أزواج مفتاح/قيمة بأي نوع مفتاح | ترتيب الإدراج وطرق واضحة |
| \`Set\` | قيماً فريدة | إزالة التكرار بسرعة |
| \`Symbol\` | قيمة فريدة | مفاتيح مميزة للكائنات |

\`\`\`javascript
const uniqueSkills = new Set(["HTML", "CSS", "HTML"]);
const scores = new Map([["ليلى", 95]]);
\`\`\`

## Iterators وميزات الوصول الآمن

تعيد Generators المكتوبة \`function*\` قيماً بالتتابع عبر \`yield\`، ويمكن إيقافها واستئنافها:

\`\`\`javascript
function* ids() {
  yield 1;
  yield 2;
}
\`\`\`

يمنع Optional Chaining الخطأ عند غياب قيمة وسيطة، ويعيد Nullish Coalescing قيمة افتراضية فقط عند \`null\` أو \`undefined\`:

| التعبير | يستخدم القيمة البديلة عند |
|---|---|
| \`value ?? fallback\` | \`null\` أو \`undefined\` |
| \`value || fallback\` | أي قيمة falsy مثل \`0\` أو النص الفارغ |

\`\`\`javascript
const city = student.profile?.city ?? "غير محددة";
\`\`\`

استخدم هذه الميزات عندما تجعل القصد أوضح، لا لمجرد حداثة الصياغة.`,
    {
      instructions: 'استخدم التفكيك لاستخراج اسم الطالب، و?. و?? لإظهار المدينة أو قيمة بديلة، ثم اطبع رسالة بالقالب النصي.',
      initialJs: `const student = {
  name: "ليلى",
  profile: { city: "الإسكندرية" }
};

// استخرج الاسم والمدينة بأمان واطبع رسالة`,
      solution: `const student = {
  name: "ليلى",
  profile: { city: "الإسكندرية" }
};

const { name, profile } = student;
const city = profile?.city ?? "غير محددة";
console.log(\`الطالبة \${name} من \${city}\`);`,
    },
    {
      question: 'ما الفرق بين ?? و || عند اختيار قيمة بديلة؟',
      options: [
        '?? يستبدل null وundefined فقط، بينما || يستبدل كل القيم falsy مثل 0.',
        'لا يوجد فرق بينهما.',
        '|| يعمل مع الكائنات فقط.',
        '?? يحول النصوص إلى أرقام.',
      ],
      correctIndex: 0,
      explanation: 'Nullish coalescing يحافظ على قيم مثل 0 والنص الفارغ، ولا يستخدم البديل إلا عند null أو undefined.',
    }
  ),
  createJavaScriptLesson(
    10,
    'js-best-practices',
    'الفصل العاشر: أفضل ممارسات JavaScript',
    'نظّم الكود، وحسّن الأداء، واهتم بالأمان والاختبار وإمكانية الوصول.',
    `# الفصل العاشر: أفضل ممارسات JavaScript

الكود الجيد لا يكتفي بأن يعمل؛ يجب أن يكون واضحاً وآمناً وسهل التعديل.

## تنظيم الأسماء والملفات

| العنصر | اصطلاح شائع | مثال |
|---|---|---|
| المتغيرات والدوال | camelCase | \`loadLessons\` |
| الأصناف | PascalCase | \`LessonCard\` |
| الثوابت العامة | UPPER_SNAKE_CASE عند الحاجة | \`MAX_RETRIES\` |
| الملفات | kebab-case | \`lesson-service.js\` |

سمِّ القيم المنطقية بـ \`is\` أو \`has\` عند جعلها أوضح مثل \`isLoading\`. اقسم الكود إلى Modules صغيرة ذات مسؤولية مفهومة، واستخدم Factory أو Observer عند حل مشكلة حقيقية لا لمجرد تطبيق نمط.

## الأداء والذاكرة

- اجمع تغييرات DOM واستخدم \`DocumentFragment\` عند إضافة عناصر كثيرة.
- استخدم debounce أو throttle للأحداث المتكررة مثل البحث والتمرير.
- استخدم memoization فقط للدوال المكلفة وبعد القياس.
- أزل مستمعات الأحداث والمؤقتات عند انتهاء الحاجة.
- تجنب إغلاقات تحتفظ بعناصر أو بيانات كبيرة بلا داعٍ.

## الأمان

لا تضع نص المستخدم غير الموثوق داخل \`innerHTML\`، ولا تستخدم \`eval()\`. استخدم \`textContent\` لبناء النص، وتحقق من المدخلات على الخادم كذلك. لا تخزن أسراراً في كود الواجهة أو تخزين المتصفح؛ تعامل مع Cookies الحساسة عبر إعدادات الخادم المناسبة مثل HttpOnly وSecure وSameSite.

## التصحيح وجودة الكود

استخدم \`console.table\` و\`console.time\` ونقاط التوقف في أدوات المطور، ويمكن وضع \`debugger\` مؤقتاً أثناء التطوير ثم إزالته. تساعد Source Maps على تتبع الكود الأصلي. استخدم ESLint لاكتشاف الأنماط الخطرة، وPrettier لتوحيد التنسيق، واختبارات الوحدة للتحقق من الوظائف الصغيرة. في TDD اكتب اختباراً يصف السلوك ثم نفذ الكود واجعله ينجح.

## الإتاحة

استخدم عناصر HTML الدلالية، واجعل التفاعل ممكناً بلوحة المفاتيح، وانقل التركيز بوضوح عند فتح الحوارات أو تغيير الشاشة. أضف ARIA عند الحاجة فقط؛ الدلالة الأصلية غالباً أفضل.

### قائمة مراجعة قبل التسليم

- هل الأسماء تصف دورها؟
- هل عالجت حالات التحميل والخطأ؟
- هل المدخلات غير الموثوقة آمنة؟
- هل يمكن استخدام الواجهة بلوحة المفاتيح؟
- هل اختبرت السلوك بدلاً من الاعتماد على الانطباع؟`,
    {
      instructions: 'اكتب دالة آمنة تعرض اسم الطالب في عنصر DOM باستخدام textContent، ثم تحقق من وجود العنصر قبل تعديله.',
      initialHtml: `<p id="greeting">ستظهر التحية هنا</p>`,
      initialJs: `const studentName = "<b>ليلى</b>";
// اختر عنصر التحية واعرض النص بأمان`,
      solution: `const studentName = "<b>ليلى</b>";
const greeting = document.querySelector("#greeting");

if (greeting) {
  greeting.textContent = \`أهلاً \${studentName}\`;
}`,
    },
    {
      question: 'ما الطريقة الأكثر أماناً لعرض نص أدخله المستخدم داخل عنصر؟',
      options: [
        'تعيين النص إلى textContent.',
        'دمجه مباشرة في innerHTML.',
        'تمريره إلى eval().',
        'إضافته كسمة onclick.',
      ],
      correctIndex: 0,
      explanation: 'textContent يعرض المدخل كنص ولا يفسره كـHTML قابل للتنفيذ.',
    }
  ),
];

lessonsData.push(...additionalJavaScriptLessons);

const javascriptLessonOrder: Record<string, number> = {
  'js-introduction': 1,
  'js-variables-and-data-types': 2,
  'js-functions-and-scope': 3,
  'js-objects-and-oop': 4,
  'js-arrays-and-objects-methods': 5,
  'dom-manipulation-and-events': 6,
  'async-await-and-fetching-apis': 7,
  'js-error-handling': 8,
  'js-es6-plus-features': 9,
  'js-best-practices': 10,
};

for (const lesson of lessonsData) {
  if (lesson.courseSlug !== 'javascript-fundamentals') continue;
  lesson.order = javascriptLessonOrder[lesson.slug];
  lesson.moduleSlug = getJavaScriptModuleSlug(lesson.order);
}

for (const lesson of lessonsData) {
  if (lesson.courseSlug === 'javascript-fundamentals') {
    lesson.contentMarkdown = javascriptLessonContent[lesson.slug] ?? lesson.contentMarkdown;
  }
}

for (const lesson of lessonsData) {
  const isHtmlOrCssLesson =
    lesson.courseSlug === 'html-fundamentals' || lesson.courseSlug === 'css-fundamentals';
  const hasGenericExercise = lesson.interactiveExercise?.instructions.startsWith(
    'طبّق مفهوم '
  ) || lesson.interactiveExercise?.instructions.startsWith('طبّق ما تعلمته عن ');

  if (isHtmlOrCssLesson && (!lesson.interactiveExercise || hasGenericExercise)) {
    lesson.interactiveExercise = createTopicExercise(
      lesson.courseSlug,
      lesson.title,
      lesson.summary,
      lesson.slug,
      lesson.contentMarkdown
    );
  }
}
