import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "ghost" | "subtle" | "link";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

type LinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = LinkProps | NativeButtonProps;

function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [styles.button, styles[`btn-${variant}`], styles[`size-${size}`], className].filter(Boolean).join(" ");
}

export default function Button(props: ButtonProps) {
  const { variant, size = "md", children, icon, className } = props;
  const classes = getClasses(variant, size, className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className={styles.iconWrap}>{icon}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick, variant: _variant, size: _size, children: _children, icon: _icon, className: _className, ...rest } =
      props as LinkProps;

    return (
      <Link href={href} className={classes} target={target} rel={rel} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  const { type = "button", variant: _variant, size: _size, children: _children, icon: _icon, className: _className, ...rest } =
    props as NativeButtonProps;

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
