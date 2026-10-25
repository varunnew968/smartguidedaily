"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Clipboard, Download, RefreshCw, Sparkles, Trash2 } from "lucide-react";

type RunnerProps = { slug: string };
type FieldProps = { label: string; value: string | number; onChange: (value: string) => void; type?: "text" | "number" | "date"; min?: number; max?: number; step?: number; placeholder?: string };

function Field({ label, value, onChange, type = "number", min, max, step, placeholder }: FieldProps) {
  return <label className="tool-field"><span>{label}</span><input className="input" type={type} value={value} min={min} max={max} step={step} placeholder={placeholder} onChange={(event) => onChange(event.target.value)}/></label>;
}
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <label className="tool-field"><span>{label}</span><select className="input" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
function Result({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="tool-result" aria-live="polite"><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>;
}
function ToolShell({ children, onReset }: { children: React.ReactNode; onReset?: () => void }) {
  return <div className="tool-runner"><div className="tool-runner-top"><span className="tool-runner-tag"><Sparkles size={14}/> Interactive tool</span>{onReset && <button className="text-button" type="button" onClick={onReset}><RefreshCw size={14}/> Reset</button>}</div>{children}</div>;
}
function fmt(value: number, digits = 2) { return Number.isFinite(value) ? value.toLocaleString("en-IN", { maximumFractionDigits: digits }) : "—"; }

function BMICalculator() {
  const [weight, setWeight] = useState("68"); const [height, setHeight] = useState("170");
  const bmi = Number(weight) / Math.pow(Number(height) / 100, 2);
  const valid = Number(weight) > 0 && Number(height) > 0 && Number.isFinite(bmi);
  const category = bmi < 18.5 ? "Below the usual adult reference range" : bmi < 25 ? "Within the usual adult reference range" : bmi < 30 ? "Above the usual adult reference range" : "High BMI range";
  return <ToolShell onReset={() => {setWeight("68");setHeight("170");}}><div className="tool-fields"><Field label="Weight (kg)" value={weight} onChange={setWeight} min={1} step={0.1}/><Field label="Height (cm)" value={height} onChange={setHeight} min={1} step={0.1}/></div>{valid ? <Result label="Estimated BMI" value={fmt(bmi, 1)} note={category}/> : <p className="tool-error">Enter a positive weight and height.</p>}<p className="tool-disclaimer">BMI is a general screening measure for adults, not a diagnosis. It may not accurately represent health for every person.</p></ToolShell>;
}

function AgeCalculator() {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState("2000-01-01"); const [asOf, setAsOf] = useState(todayStr);
  const result = useMemo(() => {
    if (!birth || !asOf) return null;
    const start = new Date(`${birth}T00:00:00`); const end = new Date(`${asOf}T00:00:00`);
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start > end) return null;
    let years = end.getFullYear() - start.getFullYear(); let months = end.getMonth() - start.getMonth(); let days = end.getDate() - start.getDate();
    if (days < 0) { const previousMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate(); days += previousMonthDays; months--; }
    if (months < 0) { months += 12; years--; }
    return { years, months, days };
  }, [birth, asOf]);
  return <ToolShell onReset={() => {setBirth("2000-01-01");setAsOf(new Date().toISOString().slice(0,10));}}><div className="tool-fields"><Field type="date" label="Date of birth" value={birth} onChange={setBirth}/><Field type="date" label="Calculate age on" value={asOf} onChange={setAsOf}/></div>{result ? <Result label="Age on selected date" value={`${result.years} years, ${result.months} months, ${result.days} days`}/> : <p className="tool-error">Choose valid dates; the calculation date must not be before the date of birth.</p>}</ToolShell>;
}

function PercentageCalculator() {
  const [percent, setPercent] = useState("20"); const [value, setValue] = useState("500"); const [part, setPart] = useState("100"); const [whole, setWhole] = useState("400");
  const amount = Number(percent) / 100 * Number(value); const share = Number(whole) === 0 ? NaN : Number(part) / Number(whole) * 100;
  return <ToolShell onReset={() => {setPercent("20");setValue("500");setPart("100");setWhole("400");}}><h3 className="tool-section-title">Find a percentage of a value</h3><div className="tool-fields"><Field label="Percentage (%)" value={percent} onChange={setPercent} step={0.1}/><Field label="Value" value={value} onChange={setValue} step={0.1}/></div><Result label={`${percent || "0"}% of ${value || "0"}`} value={fmt(amount)}/><div className="tool-divider"/><h3 className="tool-section-title">Find what percentage one number is of another</h3><div className="tool-fields"><Field label="Part" value={part} onChange={setPart} step={0.1}/><Field label="Whole" value={whole} onChange={setWhole} step={0.1}/></div><Result label="Percentage share" value={`${fmt(share)}%`}/></ToolShell>;
}

function GSTCalculator() {
  const [amount, setAmount] = useState("1000"); const [rate, setRate] = useState("18"); const [mode, setMode] = useState("add");
  const base = Number(amount); const taxRate = Number(rate) / 100; const valid = base >= 0 && taxRate >= 0 && Number.isFinite(base) && Number.isFinite(taxRate);
  const net = mode === "add" ? base : base / (1 + taxRate); const tax = mode === "add" ? base * taxRate : base - net; const total = mode === "add" ? base + tax : base;
  return <ToolShell onReset={() => {setAmount("1000");setRate("18");setMode("add");}}><div className="tool-fields"><Field label={mode === "add" ? "Amount before GST (₹)" : "Price including GST (₹)"} value={amount} onChange={setAmount} min={0} step={0.01}/><SelectField label="GST rate" value={rate} onChange={setRate} options={[{value:"0",label:"0%"},{value:"0.25",label:"0.25%"},{value:"3",label:"3%"},{value:"5",label:"5%"},{value:"12",label:"12%"},{value:"18",label:"18%"},{value:"28",label:"28%"}]}/></div><SelectField label="Calculation" value={mode} onChange={setMode} options={[{value:"add",label:"Add GST to base amount"},{value:"included",label:"Extract GST from inclusive price"}]}/>{valid ? <div className="tool-result-grid"><Result label="Base amount" value={`₹${fmt(net)}`}/><Result label="GST amount" value={`₹${fmt(tax)}`}/><Result label={mode === "add" ? "Total with GST" : "Inclusive price"} value={`₹${fmt(total)}`}/></div> : <p className="tool-error">Enter a non-negative amount and a valid tax rate.</p>}<p className="tool-disclaimer">This is a mathematical estimate. Confirm the applicable GST rate and tax treatment for your transaction.</p></ToolShell>;
}

function DiscountCalculator() {
  const [price, setPrice] = useState("1999"); const [discount, setDiscount] = useState("20"); const [extra, setExtra] = useState("0");
  const p = Number(price); const d = Number(discount); const e = Number(extra); const valid = p >= 0 && d >= 0 && d <= 100 && e >= 0 && e <= 100;
  const afterFirst = p * (1 - d / 100); const final = afterFirst * (1 - e / 100);
  return <ToolShell onReset={() => {setPrice("1999");setDiscount("20");setExtra("0");}}><div className="tool-fields"><Field label="Original price (₹)" value={price} onChange={setPrice} min={0} step={0.01}/><Field label="Discount (%)" value={discount} onChange={setDiscount} min={0} max={100} step={0.1}/><Field label="Extra discount (%) (optional)" value={extra} onChange={setExtra} min={0} max={100} step={0.1}/></div>{valid ? <div className="tool-result-grid"><Result label="Final price" value={`₹${fmt(final)}`}/><Result label="Total savings" value={`₹${fmt(p - final)}`}/><Result label="Effective discount" value={`${fmt(p ? (p - final) / p * 100 : 0, 1)}%`}/></div> : <p className="tool-error">Enter a non-negative price and discount rates from 0% to 100%.</p>}</ToolShell>;
}

function EMICalculator() {
  const [principal, setPrincipal] = useState("500000"); const [rate, setRate] = useState("10"); const [years, setYears] = useState("5");
  const p = Number(principal); const annualRate = Number(rate); const months = Number(years) * 12; const monthlyRate = annualRate / 1200;
  const emi = monthlyRate === 0 ? p / months : p * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const valid = p > 0 && annualRate >= 0 && Number(years) > 0 && months <= 1200 && Number.isFinite(emi);
  return <ToolShell onReset={() => {setPrincipal("500000");setRate("10");setYears("5");}}><div className="tool-fields"><Field label="Loan amount (₹)" value={principal} onChange={setPrincipal} min={1} step={1000}/><Field label="Annual interest rate (%)" value={rate} onChange={setRate} min={0} step={0.1}/><Field label="Tenure (years)" value={years} onChange={setYears} min={0.1} max={100} step={0.5}/></div>{valid ? <div className="tool-result-grid"><Result label="Estimated monthly EMI" value={`₹${fmt(emi)}`}/><Result label="Total interest" value={`₹${fmt(emi * months - p)}`}/><Result label="Total repayment" value={`₹${fmt(emi * months)}`}/></div> : <p className="tool-error">Enter a positive loan amount, non-negative rate, and a tenure up to 100 years.</p>}<p className="tool-disclaimer">Excludes processing fees, insurance, rate changes, and lender-specific rounding.</p></ToolShell>;
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("50000"); const [rate, setRate] = useState("8"); const [years, setYears] = useState("5"); const [frequency, setFrequency] = useState("12");
  const p = Number(principal); const r = Number(rate) / 100; const y = Number(years); const n = Number(frequency); const amount = p * Math.pow(1 + r / n, n * y); const valid = p >= 0 && r >= 0 && y >= 0 && y <= 100 && [1,2,4,12,365].includes(n) && Number.isFinite(amount);
  return <ToolShell onReset={() => {setPrincipal("50000");setRate("8");setYears("5");setFrequency("12");}}><div className="tool-fields"><Field label="Initial amount (₹)" value={principal} onChange={setPrincipal} min={0} step={1000}/><Field label="Annual interest rate (%)" value={rate} onChange={setRate} min={0} step={0.1}/><Field label="Duration (years)" value={years} onChange={setYears} min={0} max={100} step={0.5}/><SelectField label="Compounding frequency" value={frequency} onChange={setFrequency} options={[{value:"1",label:"Annually"},{value:"2",label:"Half-yearly"},{value:"4",label:"Quarterly"},{value:"12",label:"Monthly"},{value:"365",label:"Daily"}]}/></div>{valid ? <div className="tool-result-grid"><Result label="Projected value" value={`₹${fmt(amount)}`}/><Result label="Interest earned" value={`₹${fmt(amount - p)}`}/><Result label="Starting amount" value={`₹${fmt(p)}`}/></div> : <p className="tool-error">Enter valid non-negative values. Duration must be 100 years or less.</p>}<p className="tool-disclaimer">This projection assumes a constant rate and no contributions, withdrawals, taxes, or fees.</p></ToolShell>;
}

function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+|[^.!?]+$/gu) || []).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/u).filter(Boolean).length : 0;
  return <ToolShell onReset={() => setText("")}><label className="tool-field"><span>Paste or type your text</span><textarea className="input tool-textarea" rows={10} value={text} onChange={(event) => setText(event.target.value)} placeholder="Start typing here…"/></label><div className="tool-result-grid four"><Result label="Words" value={fmt(words,0)}/><Result label="Characters" value={fmt(text.length,0)}/><Result label="Sentences" value={fmt(sentences,0)}/><Result label="Paragraphs" value={fmt(paragraphs,0)}/></div><p className="small-muted">All counting is performed in your browser.</p></ToolShell>;
}

function CaseConverter() {
  const [text, setText] = useState(""); const [result, setResult] = useState(""); const [copied, setCopied] = useState(false);
  function convert(mode: string) {
    if (mode === "upper") setResult(text.toUpperCase());
    if (mode === "lower") setResult(text.toLowerCase());
    if (mode === "title") setResult(text.toLowerCase().replace(/(^|[\s\-_/])([\p{L}\p{N}])/gu, (_, before: string, letter: string) => before + letter.toUpperCase()));
    if (mode === "sentence") setResult(text.toLowerCase().replace(/(^\s*[\p{L}]|[.!?]\s+[\p{L}])/gu, (match) => match.toUpperCase()));
    setCopied(false);
  }
  async function copy() { try { await navigator.clipboard.writeText(result); setCopied(true); } catch { setCopied(false); } }
  return <ToolShell onReset={() => {setText("");setResult("");setCopied(false);}}><label className="tool-field"><span>Input text</span><textarea className="input tool-textarea" rows={5} value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste the text you want to convert…"/></label><div className="tool-button-row"><button className="btn btn-primary" type="button" onClick={() => convert("upper")}>UPPERCASE</button><button className="btn btn-outline" type="button" onClick={() => convert("lower")}>lowercase</button><button className="btn btn-outline" type="button" onClick={() => convert("title")}>Title Case</button><button className="btn btn-outline" type="button" onClick={() => convert("sentence")}>Sentence case</button></div><label className="tool-field"><span>Converted text</span><textarea className="input tool-textarea" rows={5} value={result} onChange={(event) => setResult(event.target.value)} placeholder="Your converted text will appear here…"/></label><button className="btn btn-outline" type="button" disabled={!result} onClick={() => void copy()}>{copied ? <Check size={16}/> : <Clipboard size={16}/>} {copied ? "Copied" : "Copy result"}</button></ToolShell>;
}

function JSONFormatter() {
  const [input, setInput] = useState('{\n  "name": "SmartGuideDaily",\n  "active": true\n}'); const [output, setOutput] = useState(""); const [status, setStatus] = useState("");
  function format(minify: boolean) { try { const parsed = JSON.parse(input); setOutput(JSON.stringify(parsed, null, minify ? undefined : 2)); setStatus("Valid JSON"); } catch (error) { setOutput(""); setStatus(error instanceof Error ? error.message : "Invalid JSON"); } }
  async function copyOutput() { try { await navigator.clipboard.writeText(output); setStatus("Result copied"); } catch { setStatus("Copy failed. Select the result and copy it manually."); } }
  return <ToolShell onReset={() => {setInput('{\n  "name": "SmartGuideDaily",\n  "active": true\n}');setOutput("");setStatus("");}}><label className="tool-field"><span>JSON input</span><textarea className="input tool-textarea mono" rows={9} value={input} onChange={(event) => {setInput(event.target.value);setStatus("");}} spellCheck={false}/></label><div className="tool-button-row"><button className="btn btn-primary" type="button" onClick={() => format(false)}>Format JSON</button><button className="btn btn-outline" type="button" onClick={() => format(true)}>Minify JSON</button></div>{status && <p className={status === "Valid JSON" || status === "Result copied" ? "tool-success" : "tool-error"} role="status">{status}</p>}{output && <label className="tool-field"><span>Result</span><textarea className="input tool-textarea mono" rows={8} value={output} readOnly/><button className="btn btn-outline" type="button" onClick={() => void copyOutput()}><Clipboard size={16}/> Copy result</button></label>}<p className="small-muted">Input is parsed locally and is not uploaded. Keep credentials and secrets out of public code or shared snippets.</p></ToolShell>;
}

function PasswordGenerator() {
  const [length, setLength] = useState("18"); const [lower, setLower] = useState(true); const [upper, setUpper] = useState(true); const [numbers, setNumbers] = useState(true); const [symbols, setSymbols] = useState(true); const [password, setPassword] = useState(""); const [copied, setCopied] = useState(false);
  function generate() { let chars = ""; if (lower) chars += "abcdefghijklmnopqrstuvwxyz"; if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; if (numbers) chars += "0123456789"; if (symbols) chars += "!@#$%^&*()-_=+[]{}?"; if (!chars) { setPassword(""); return; } const requested = Number(length); if (!Number.isFinite(requested)) { setPassword(""); return; } const size = Math.min(128, Math.max(8, Math.round(requested))); const values = new Uint32Array(size); crypto.getRandomValues(values); setPassword(Array.from(values, (n) => chars[n % chars.length]).join("")); setCopied(false); }
  async function copy() { try { await navigator.clipboard.writeText(password); setCopied(true); } catch { setCopied(false); } }
  return <ToolShell onReset={() => {setLength("18");setLower(true);setUpper(true);setNumbers(true);setSymbols(true);setPassword("");setCopied(false);}}><Field label="Password length (8–128)" value={length} onChange={setLength} min={8} max={128} step={1}/><div className="tool-checks"><label><input type="checkbox" checked={lower} onChange={(e)=>setLower(e.target.checked)}/> Lowercase letters</label><label><input type="checkbox" checked={upper} onChange={(e)=>setUpper(e.target.checked)}/> Uppercase letters</label><label><input type="checkbox" checked={numbers} onChange={(e)=>setNumbers(e.target.checked)}/> Numbers</label><label><input type="checkbox" checked={symbols} onChange={(e)=>setSymbols(e.target.checked)}/> Symbols</label></div><button className="btn btn-primary" type="button" onClick={generate}>Generate password</button>{password && <div className="tool-password-result"><code>{password}</code><button className="btn btn-outline" type="button" onClick={() => void copy()}>{copied ? <Check size={16}/> : <Clipboard size={16}/>} {copied ? "Copied" : "Copy"}</button></div>}<p className="small-muted">Generated in your browser with the Web Crypto API. Use a unique password and store it securely.</p></ToolShell>;
}

function RandomNumberGenerator() {
  const [min, setMin] = useState("1"); const [max, setMax] = useState("100"); const [count, setCount] = useState("1"); const [result, setResult] = useState<number[]>([]); const [error, setError] = useState("");
  function generate() { const lo = Math.ceil(Number(min)); const hi = Math.floor(Number(max)); const n = Math.max(1, Math.min(50, Math.floor(Number(count)))); if (!Number.isSafeInteger(lo) || !Number.isSafeInteger(hi) || lo > hi || hi - lo > 1e9 || n < 1) { setError("Enter a valid integer range and a count from 1 to 50."); setResult([]); return; } const values = new Uint32Array(n); crypto.getRandomValues(values); setResult(Array.from(values, (v) => lo + (v % (hi - lo + 1)))); setError(""); }
  return <ToolShell onReset={() => {setMin("1");setMax("100");setCount("1");setResult([]);setError("");}}><div className="tool-fields"><Field label="Minimum (inclusive)" value={min} onChange={setMin} step={1}/><Field label="Maximum (inclusive)" value={max} onChange={setMax} step={1}/><Field label="How many numbers (1–50)" value={count} onChange={setCount} min={1} max={50} step={1}/></div><button className="btn btn-primary" type="button" onClick={generate}>Generate numbers</button>{error && <p className="tool-error">{error}</p>}{result.length > 0 && <div className="tool-result"><span>Generated result</span><strong className="random-results">{result.join(", ")}</strong><button className="btn btn-outline" type="button" onClick={() => void navigator.clipboard?.writeText(result.join(", "))}><Clipboard size={16}/> Copy numbers</button></div>}</ToolShell>;
}

const lengthUnits: Record<string, { label: string; meters: number }> = {
  mm: { label: "Millimetres (mm)", meters: 0.001 }, cm: { label: "Centimetres (cm)", meters: 0.01 }, m: { label: "Metres (m)", meters: 1 }, km: { label: "Kilometres (km)", meters: 1000 },
  inch: { label: "Inches (in)", meters: 0.0254 }, ft: { label: "Feet (ft)", meters: 0.3048 }, yd: { label: "Yards (yd)", meters: 0.9144 }, mi: { label: "Miles (mi)", meters: 1609.344 },
};
function UnitConverter() {
  const [value, setValue] = useState("1"); const [from, setFrom] = useState("m"); const [to, setTo] = useState("ft"); const valid = Number.isFinite(Number(value)); const result = Number(value) * lengthUnits[from].meters / lengthUnits[to].meters;
  const options = Object.entries(lengthUnits).map(([key, item]) => ({ value: key, label: item.label }));
  return <ToolShell onReset={() => {setValue("1");setFrom("m");setTo("ft");}}><div className="tool-fields"><Field label="Value" value={value} onChange={setValue} step={0.01}/><SelectField label="From" value={from} onChange={setFrom} options={options}/><SelectField label="To" value={to} onChange={setTo} options={options}/></div>{valid ? <Result label={`${value || "0"} ${from} equals`} value={`${fmt(result, 6)} ${to}`}/> : <p className="tool-error">Enter a valid number.</p>}</ToolShell>;
}

function TemperatureConverter() {
  const [value, setValue] = useState("25"); const [from, setFrom] = useState("C");
  const c = Number(value) * (from === "F" ? 5/9 : from === "K" ? 1 : 1) + (from === "F" ? -32 * 5/9 : from === "K" ? -273.15 : 0);
  const converted: Record<string, number> = { C: c, F: c * 9/5 + 32, K: c + 273.15 };
  const labels: Record<string, string> = { C: "Celsius (°C)", F: "Fahrenheit (°F)", K: "Kelvin (K)" };
  const options = Object.entries(labels).map(([key, label]) => ({ value: key, label }));
  return <ToolShell onReset={() => {setValue("25");setFrom("C");}}><div className="tool-fields"><Field label="Temperature" value={value} onChange={setValue} step={0.1}/><SelectField label="Input scale" value={from} onChange={setFrom} options={options}/></div>{Number.isFinite(Number(value)) ? <div className="tool-result-grid"><Result label="Celsius" value={`${fmt(converted.C, 2)} °C`}/><Result label="Fahrenheit" value={`${fmt(converted.F, 2)} °F`}/><Result label="Kelvin" value={`${fmt(converted.K, 2)} K`}/></div> : <p className="tool-error">Enter a valid temperature.</p>}</ToolShell>;
}

function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null); const [quality, setQuality] = useState("0.75"); const [output, setOutput] = useState<Blob | null>(null); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function compress() {
    if (!file) { setError("Choose an image first."); return; }
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    setBusy(true); setError(""); setOutput(null);
    try {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error("The image could not be read.")); img.src = imageUrl; });
      URL.revokeObjectURL(imageUrl);
      const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Your browser could not create an image canvas.");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight; ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Compression failed. Try a different image.")), "image/jpeg", Math.min(0.95, Math.max(0.2, Number(quality)))));
      setOutput(blob);
    } catch (e) { setError(e instanceof Error ? e.message : "Compression failed."); }
    finally { setBusy(false); }
  }
  function download() { if (!output) return; const url = URL.createObjectURL(output); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${(file?.name || "image").replace(/\.[^.]+$/, "")}-compressed.jpg`; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); }
  return <ToolShell onReset={() => {setFile(null);setOutput(null);setError("");setQuality("0.75");}}><label className="tool-field"><span>Choose an image</span><input className="input" type="file" accept="image/*" onChange={(e) => {setFile(e.target.files?.[0] || null);setOutput(null);setError("");}}/></label>{file && <p className="small-muted">Selected: {file.name} · {fmt(file.size / 1024, 1)} KB</p>}<Field label={`JPEG quality (${Math.round(Number(quality) * 100)}%)`} value={quality} onChange={setQuality} min={0.2} max={0.95} step={0.05}/><button className="btn btn-primary" type="button" disabled={!file || busy} onClick={() => void compress()}>{busy ? "Compressing…" : "Compress image"}</button>{error && <p className="tool-error">{error}</p>}{output && <div className="tool-result-grid"><Result label="Original size" value={`${fmt((file?.size || 0) / 1024, 1)} KB`}/><Result label="Compressed size" value={`${fmt(output.size / 1024, 1)} KB`}/><Result label="Size change" value={`${fmt(file?.size ? (1-output.size/file.size)*100 : 0, 1)}%`} note={output.size > (file?.size || 0) ? "This output is larger; try lower quality or another source." : "Estimated reduction"}/><button className="btn btn-outline" type="button" onClick={download}><Download size={16}/> Download JPEG</button></div>}<p className="small-muted">The output is JPEG. Transparent backgrounds will be filled, and the quality setting may affect fine details. Files stay in this browser session.</p></ToolShell>;
}

type Task = { id: string; text: string; done: boolean };
function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]); const [newTask, setNewTask] = useState(""); const [loaded, setLoaded] = useState(false);
  useEffect(() => { try { const saved = window.localStorage.getItem("smartguidedaily-tasks"); if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) setTasks(parsed.filter((task) => task && typeof task.id === "string" && typeof task.text === "string" && typeof task.done === "boolean")); } } catch { /* Ignore unavailable or invalid local storage. */ } setLoaded(true); }, []);
  useEffect(() => { if (loaded) { try { window.localStorage.setItem("smartguidedaily-tasks", JSON.stringify(tasks)); } catch { /* Local storage may be disabled or full. */ } } }, [tasks, loaded]);
  function addTask(event: FormEvent) { event.preventDefault(); const text = newTask.trim(); if (!text) return; setTasks((current) => [{ id: `${Date.now()}-${crypto.randomUUID()}`, text, done: false }, ...current]); setNewTask(""); }
  return <ToolShell onReset={() => setTasks([])}><form onSubmit={addTask} className="todo-add"><input className="input" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a task…" aria-label="New task" maxLength={180}/><button className="btn btn-primary" type="submit">Add task</button></form><div className="todo-summary">{tasks.filter((task) => task.done).length} completed · {tasks.filter((task) => !task.done).length} remaining</div>{tasks.length ? <ul className="todo-list">{tasks.map((task) => <li key={task.id}><label><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}/><span className={task.done ? "todo-done" : ""}>{task.text}</span></label><button type="button" className="icon-button" aria-label={`Delete ${task.text}`} onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}><Trash2 size={16}/></button></li>)}</ul> : <div className="empty-state todo-empty">Your list is empty. Add a task to get started.</div>}<p className="small-muted">Tasks are saved in this browser's local storage. Clearing browser data may remove them.</p></ToolShell>;
}

export default function ToolRunner({ slug }: RunnerProps) {
  switch (slug) {
    case "bmi-calculator": return <BMICalculator/>;
    case "age-calculator": return <AgeCalculator/>;
    case "percentage-calculator": return <PercentageCalculator/>;
    case "gst-calculator": return <GSTCalculator/>;
    case "discount-calculator": return <DiscountCalculator/>;
    case "emi-calculator": return <EMICalculator/>;
    case "compound-interest-calculator": return <CompoundInterestCalculator/>;
    case "word-counter": return <WordCounter/>;
    case "case-converter": return <CaseConverter/>;
    case "json-formatter": return <JSONFormatter/>;
    case "password-generator": return <PasswordGenerator/>;
    case "random-number-generator": return <RandomNumberGenerator/>;
    case "unit-converter": return <UnitConverter/>;
    case "temperature-converter": return <TemperatureConverter/>;
    case "image-compressor": return <ImageCompressor/>;
    case "todo-list": return <TodoList/>;
    default: return <div className="empty-state">This tool is not available.</div>;
  }
}
