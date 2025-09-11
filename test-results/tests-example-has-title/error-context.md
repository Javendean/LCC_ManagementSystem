# Page snapshot

```yaml
- main [ref=e3]:
  - heading "Login" [level=1] [ref=e4]
  - paragraph [ref=e5]: Please sign in to continue.
  - generic [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e8]: Email
      - textbox "Email" [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11]: Password
      - textbox "Password" [ref=e12]
    - button "Log In" [ref=e13] [cursor=pointer]
    - link "Forgot Password?" [ref=e15] [cursor=pointer]:
      - /url: /auth/forgot-password
```