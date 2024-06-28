import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6 ">
      {' '}
      {/* Add left margin on md screens */}
      <CenteredMenu
        logo={
          <div className="flex items-center">
            {children}
            <Logo />
          </div>
        }
        rightMenu={
          <>
            <li>
              <LocaleSwitcher />
            </li>
            <li>
              <Link href="/sign-in">{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/404">
                {t('sign_up')}
              </Link>
            </li>
          </>
        }
      >
        <li>
          <Link href="/404">{t('product')}</Link>
        </li>

        <li>
          <Link href="/404">{t('docs')}</Link>
        </li>

        <li>
          <Link href="/404">{t('blog')}</Link>
        </li>

        <li>
          <Link href="/404">{t('community')}</Link>
        </li>

        <li>
          <Link href="/404">{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};

export { Navbar };
