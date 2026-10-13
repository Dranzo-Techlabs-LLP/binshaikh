"""Local dev server for the Bin Shaikh website (no caching, so edits show instantly).
Usage: python3 serve.py [port]   ->   http://localhost:5173
"""
import http.server, socketserver, sys, os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".webp": "image/webp", ".js": "text/javascript"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Bin Shaikh site running at http://localhost:{PORT}")
    httpd.serve_forever()
