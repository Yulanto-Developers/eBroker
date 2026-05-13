import { Layout } from './BigweinCommon';
export default function LoginPage() {
    return <Layout className="bigwein-theme login-page"><main><section className="login-creative"><div className="login-card"><div className="login-visual"><h1>Welcome to Bigwein</h1><p>Manage your property search, favourites and enquiries from one account.</p></div><form className="login-form" onSubmit={(e) => e.preventDefault()}><h2>Login / Sign up</h2><label>Mobile Number<input placeholder="Enter mobile number" /></label><label>Password<input type="password" placeholder="Enter password" /></label><button className="lux-btn search-btn" type="submit">Continue</button><p>New to Bigwein? Create an account to post and manage properties.</p></form></div></section></main></Layout>
}
