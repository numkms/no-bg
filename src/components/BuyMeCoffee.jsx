export const BuyMeCoffee = ({ i18n, t }) => {
  return (
    <a
      href="https://buymeacoffee.com/cutbg"
      className="btn-arcane rounded p-2 shadow-md mt-2"
      target="_blank"
    >
      <span>{t("support_us")}</span>
    </a>
  );
};
