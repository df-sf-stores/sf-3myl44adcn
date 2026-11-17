import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { AuthLayout } from '../../components/AuthLayout'
import { Layout } from '../../components/Layout'
import { SignInForm } from '../../components/interactive/AuthForms'

export const SignInPage = () => {
  const { t } = useStorefront()
  return (
    <Layout bare>
      <AuthLayout lead={t('site.auth.welcomeBack')} title={t('site.auth.signIn')} subtitle={t('site.auth.enterCredentials')}>
        <SignInForm />
      </AuthLayout>
    </Layout>
  )
}
