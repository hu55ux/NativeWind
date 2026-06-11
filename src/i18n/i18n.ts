import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    welcome: 'Welcome Back!',
    available_balance: 'Available Balance',
    loan_pending: 'Loan Pending',
    details: 'Details',
    topup: 'Topup',
    monthly_report: 'Monthly Report',
    requests: 'Requests',
    see_all: 'See all Transactions',
    my_cards: 'My Cards',
    deposits: 'Deposits',
    transactions: 'Transactions',
    loan: 'Loan',
    change_language: 'Dil / Language',
  },
  az: {
    welcome: 'Xoş gəldiniz!',
    available_balance: 'Mövcud Balans',
    loan_pending: 'Gözləyən Kredit',
    details: 'Təfərrüatlar',
    topup: 'Balansı artır',
    monthly_report: 'Aylıq Hesabat',
    requests: 'Sorğular',
    see_all: 'Bütün Əməliyyatları Gör',
    my_cards: 'Kartlarım',
    deposits: 'Depozitlər',
    transactions: 'Əməliyyatlar',
    loan: 'Kredit',
    change_language: 'Language / Dil',
  }
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;
