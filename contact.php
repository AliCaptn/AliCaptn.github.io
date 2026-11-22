<?php
/* AR BI Consulting: inquiry handler. Upload next to index.html on any PHP host. No database, no fees. */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$TO = 'arbiconsultings@gmail.com';   // where inquiries are delivered

function out($ok, $error = '', $code = 200) {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(false, 'POST only', 405);

/* Honeypot: real visitors leave this empty */
if (!empty($_POST['website'])) out(true);

function clean($v, $max) {
    $v = trim((string)$v);
    $v = str_replace(["\r", "\n"], ' ', $v);          // block header injection
    return mb_substr($v, 0, $max);
}
$name    = clean($_POST['name'] ?? '', 120);
$email   = clean($_POST['email'] ?? '', 160);
$company = clean($_POST['company'] ?? '', 160);
$service = clean($_POST['service'] ?? '', 160);
$budget  = clean($_POST['budget'] ?? '', 80);
$details = trim((string)($_POST['details'] ?? ''));
$details = mb_substr($details, 0, 4000);

if (mb_strlen($name) < 2)                          out(false, 'Name is required', 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    out(false, 'Valid email is required', 422);
if ($service === '')                               out(false, 'Service is required', 422);
if (mb_strlen($details) < 10)                      out(false, 'Project details are too short', 422);

/* Light rate limit: one inquiry per 30 seconds per visitor */
@session_start();
if (!empty($_SESSION['last']) && time() - $_SESSION['last'] < 30) out(false, 'Please wait a moment and try again', 429);
$_SESSION['last'] = time();

$host    = preg_replace('/^www\./', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
$subject = 'New website inquiry: ' . $service;
$body    = "Name: $name\nEmail: $email\nCompany: $company\nService: $service\nBudget: $budget\n\nProject details:\n$details\n";
$headers = "From: AR BI Website <noreply@$host>\r\nReply-To: $name <$email>\r\nContent-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
if (!$sent) out(false, 'Mail could not be sent', 500);
out(true);
