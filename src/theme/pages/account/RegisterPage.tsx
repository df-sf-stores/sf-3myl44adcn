import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { AuthLayout } from '../../components/AuthLayout'
import { Layout } from '../../components/Layout'
import { RegisterForm } from '../../components/interactive/AuthForms'

export const RegisterPage = () => {
  const { t } = useStorefront()
  return (
    <Layout bare>
      <AuthLayout lead={t('site.auth.joinUs')} title={t('site.auth.createAccount')} subtitle={t('site.auth.signUpMessage')}>
        <RegisterForm />
      </AuthLayout>
    </Layout>
  )
}
