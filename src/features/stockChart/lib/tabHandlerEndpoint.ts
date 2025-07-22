export function tabHandlerEndpoint(segment: string, domain: string) {
  const p = segment.split("/");
  p.pop();
  const path = p.join("/") + "/" + domain;
  return path;
}
