import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
    en: {
        translation: {
            "WelcomeTitle": "Welcome!",
            "WelcomeText": "",
            "SignUp": "Sign Up",
            "SignUp2": "Sign Up",
            "SignUpTitle": "Sign Up",
            "SignUpDescription": "Enter your details below to register. You must have access to your account recovery email.",
            "SignIn": "Sign In",
            "SignInTitle": "Sign In",
            "Continue": "Continue",
            "GoBack": "Go Back",
            "Cancel": "Cancel",
            "AlreadyHaveAnAccount": "Already have an account?",
            "DontHaveAnAccount": "Don't have an account?",
            "AllRightsReserved": "All Rights Reserved",
            "Name": "Name",
            "Email": "Email",
            "Password": "Password",
            "EnterEmail": "Enter your E-mail",
            "EnterPassword": "Enter password",
            "RepeatPassword": "Repeat Password",
            "ForgotPassword": "Forgot Password?",
            "OrSignInWith": "Or sign in with",
            "SignInWithApple": "Sign in with Apple",
            "SignInWithGoogle": "Sign in with Google",
            "RegistrationDietInfoTitle": "Describe your current diet",
            "RegistrationDietInfoDescription": "Choose from a preset list, then customize and exclude certain foods later.",
            "ChooseFromList": "Choose from list",
            "RegistrationAvoidingProductsInfoTitle": "Are there any products you avoid?",
            "RegistrationAvoidingProductsInfoDescription": "This may be due to allergies or some other reason.",
            "RegistrationPurposeInfoTitle": "What is your purpose?",
            "RegistrationPurposeInfoDescription": "This information allows us to offer meals that will help you achieve your goals.",
            "GeneralPurpose": "General Purpose",
            "ExactPurpose": "Exact Purpose",
            "PurposeWeightPlaceholder": "Weight goal (kg.)",
            "PurposeWeightWeeklyPlaceholder": "Target weight change (kg. weekly)",
            "RegistrationPersonalInfoTitle": "Tell us about you",
            "RegistrationPersonalInfoDescription": "This information allows us to estimate your daily nutritional needs.",
            "RegistrationGenderType": "Gender",
            "RegistrationHeight": "Height (cm)",
            "RegistrationWeight": "Weight (kg)",
            "RegistrationAge": "Age",
            "RegistrationActivityLevel": "Activity level",
            "UserWithEmailAlreadyRegistered": "User with this email already registered",
            "SomeValuesWerentEntered": "Some values weren't entered",
            "FieldIsRequired": "This field is required",
            "PasswordsDoNotMatch": "passwords do not match",

            "Planner": "Planner",
            "Products": "Products",
            "Day": "Day",
            "Week": "Week",

            "Profile": "Profile",
            "EditProfile": "Edit Profile",
            "SignOut": "Sign out",

            "Diet": "Diet",
            "ExcludedProducts": "Excluded products",
            "Purpose": "Purpose",
            "All":"All",
            "GeneralInfo": "General Info",
            "Save": "Save",

            "UserWithEmailNotFound": "User with entered email not found",
            "UserWrongPassword": "Wrong password",

            "OldPassword": "Old Password",
            "NewPassword": "New password",
            "RepeatNewPassword": "Repeat new password",

            "EditDay": "Edit day",
            "NoPlanForDate": "The meal plan has not been planned",
            "NoPlanForDateDescription": "Generate meals automatically or plan them manually using our grocery list,",
            "Generate": "Generate",
            "Manually": "Manually",
            "Eating": "Eating",
            "PCF_Analytics": "PCF Analytics",
            "Calories":"Calories",
            "Fats": "Fats",
            "Proteins": "Proteins",
            "Carbohydrates": "Carbohydrates",

            "Breakfast":"Breakfast",
            "Brunch":"Brunch",
            "Lunch":"Lunch",
            "Dinner":"Dinner",
            "AddMeal":"Add Meal",
            "AddMealFirst":"Add meals first",
            "SearchMeals": "Search Meals",
            "Recipe":"Recipe",
            "Ingredients":"Ingredients",
            "Milliliters":"Milliliters",
            "Grams":"Grams",
            "Pieces":"Pieces",
            "Spoons":"Spoons",

            "RecommendMore":"Recommend more",
            "DontRecommend":"Don't recommend",
            "AddToProducts":"Add to products",

            "Today":"Today",
            "Yesterday":"Yesterday",
            "Tomorrow":"Tomorrow",

            "ProductsList":"List of products",
            "UnfortunatelyNotFound":"Unfortunately, nothing was found",
            "ProductsListAddProductsDescription": "Add products in planner or in",
            "ProductsListSearchProducts": "search products",
            "SupermarketsNearby": "Supermarkets nearby",
        }
    },
    ru: {
        translation: {
            "WelcomeTitle": "Добро пожаловать!",
            "WelcomeText": "HealthTrack помогает вам создавать индивидуальные планы питания, учитывая ваши предпочтения, бюджет и расписание. С помощью нашего калькулятора калорий, еженедельных планов питания и списков продуктов вы можете достигать своих целей в области диеты и питания!",
            "SignUp": "Регистрация",
            "SignUp2": "Зарегистрироваться",
            "SignUpTitle": "Давайте начнем",
            "SignUpDescription": "Введите данные ниже для регистрации. У вас должен быть доступ к электронной почте для восстановления аккаунта.",
            "SignIn": "Войти",
            "SignInTitle": "Вход",
            "Continue": "Продолжить",
            "GoBack": "Вернуться назад",
            "Cancel": "Отменить",
            "AlreadyHaveAnAccount": "Уже зарегистрированы?",
            "DontHaveAnAccount": "Нет аккаунта?",
            "AllRightsReserved": "Все права защищены",
            "Name": "Имя",
            "Email": "Почта",
            "Password": "Пароль",
            "EnterEmail": "Введите электронную почту",
            "EnterPassword": "Введите пароль",
            "RepeatPassword": "Повторите пароль",
            "ForgotPassword": "Забыли пароль?",
            "OrSignInWith": "Или войти через",
            "SignInWithApple": "Войти через Apple",
            "SignInWithGoogle": "Войти через Google",
            "RegistrationDietInfoTitle": "Какой сейчас ваш рацион питания?",
            "RegistrationDietInfoDescription": "Выберете из заранее установленного списка, а затем настройте и исключите определенные продукты позже.",
            "ChooseFromList": "Выберите из списка",
            "RegistrationAvoidingProductsInfoTitle": "Есть ли продукты, которых вы избегаете?",
            "RegistrationAvoidingProductsInfoDescription": "Это может быть связано с аллергией или какой-либо другой причиной.",
            "RegistrationPurposeInfoTitle": "Какова ваша цель?",
            "RegistrationPurposeInfoDescription": "Эта информация позволяет нам предлагать те блюда, которые помогут вам достичь вашей цели.",
            "GeneralPurpose": "Общая цель",
            "ExactPurpose": "Точная цель",
            "PurposeWeightPlaceholder": "Цель по весу (кг.)",
            "PurposeWeightWeeklyPlaceholder": "Целевое изменение веса (кг. в неделю)",
            "RegistrationPersonalInfoTitle": "Расскажите нам о себе",
            "RegistrationPersonalInfoDescription": "Эта информация позволяет нам оценить ваши потребности в питании на каждый день.",
            "RegistrationGenderType": "Пол",
            "RegistrationHeight": "Рост (см)",
            "RegistrationWeight": "Вес (кг)",
            "RegistrationAge": "Возраст",
            "RegistrationActivityLevel": "Уровень активности",
            "UserWithEmailAlreadyRegistered": "Пользователь с введенной эл-почтой уже существует",
            "SomeValuesWerentEntered": "Не все поля были заполнены",
            "FieldIsRequired": "Это поле обязательно",
            "PasswordsDoNotMatch": "Неправильно введенный пароль",

            "Planner": "Планнер",
            "Products": "Продукты",
            "Day": "День",
            "Week": "Неделя",

            "Profile": "Профиль",
            "EditProfile": "Редактировать профиль",
            "SignOut": "Выйти",

            "Diet": "Рацион питания",
            "ExcludedProducts": "Исключенные продукты",
            "Purpose": "Цель",
            "All":"Всего",
            "GeneralInfo": "Общие данные",
            "Save": "Сохранить",

            "UserWithEmailNotFound": "Пользователь с введенной эл-почтой не найден",
            "UserWrongPassword": "Неправильный пароль",

            "OldPassword": "Старый пароль",
            "NewPassword": "Новый пароль",
            "RepeatNewPassword": "Повторите новый пароль",

            "EditDay": "Редактировать день",
            "NoPlanForDate": "Питание пока не запланировано",
            "NoPlanForDateDescription": "Сгенерируйте питание автоматически или планируйте его вручную с помощью нашего списка продуктов",
            "Generate": "Сгенерировать",
            "Manually": "Вручную",
            "Eating": "Питание",
            "PCF_Analytics": "Аналитика БЖУ",
            "Calories": "Калорий",
            "Fats": "Жиры",
            "Proteins": "Белки",
            "Carbohydrates": "Углеводы",

            "Breakfast":"Завтрак",
            "Brunch":"Полдник",
            "Lunch":"Обед",
            "Dinner":"Ужин",
            "AddMeal":"Добавить блюдо",
            "AddMealFirst":"Сначала добавьте блюда",
            "SearchMeals": "Поиск блюда",
            "Recipe":"Рецепт",
            "Ingredients":"Ингредиенты",
            "Milliliters":"Миллилитров",
            "Grams":"Грамм",
            "Pieces":"Штук",
            "Spoons":"Ложек",

            "RecommendMore":"Рекомендовать чаще",
            "DontRecommend":"Не рекомендовать",
            "AddToProducts":"Добавить в продукты",

            "Today":"Сегодня",
            "Yesterday":"Вчера",
            "Tomorrow":"Завтра",
            "ProductsList":"Список продуктов",
            "UnfortunatelyNotFound":"К сожалению, ничего не найдено",
            "ProductsListAddProductsDescription": "Добавьте продукты во вкладке планнер или в",
            "ProductsListSearchProducts": "поиске продуктов",
            "SupermarketsNearby": "Супермаркеты рядом",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
