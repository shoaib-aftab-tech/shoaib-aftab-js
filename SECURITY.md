# Security Policy

The **Shoaib Aftab JS Framework** is designed with a "Secure by Default" architecture. It is built to meet the rigorous demands of enterprise applications, banking systems, and high-security government portals.

## Supported Versions

Currently, the following versions are supported with security patches:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Security Features

1. **Prototype Pollution Protection**
   Our reactivity engine features strict path resolution (`resolvePath` / `setPath`) that inherently blocks malicious injection into `__proto__`, `constructor`, or `prototype` keys. This ensures absolute safety when parsing dynamic data bindings.

2. **Advanced DOM Sanitization (`sa-html`)**
   The built-in HTML sanitizer acts as a lightweight `DOMPurify` alternative. It rigorously parses and strips dangerous tags (`<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<svg>`, `<math>`, `<base>`, `<meta>`, `<link>`, `<style>`) and completely neutralizes JavaScript/Data URI attribute payloads, even those obfuscated with whitespaces or control characters.

3. **CSP Compliant (No `eval`)**
   We have entirely eliminated `eval()` and `new Function()` from our parsing engine. Class and attribute bindings are parsed via secure string manipulation, making the framework 100% compliant with strict Content Security Policies (CSP).

4. **Zero Dependency & Supply Chain Security**
   The framework relies on 0 external NPM packages. There is no dependency tree that could be compromised via supply-chain attacks.

## Reporting a Vulnerability

If you discover a vulnerability, please do NOT open a public issue. We take security seriously and ask that you report it privately.

**Email:** security@shoaib-aftab-tech.com

We will acknowledge your email within 24 hours and issue a patch (if required) within 72 hours.
