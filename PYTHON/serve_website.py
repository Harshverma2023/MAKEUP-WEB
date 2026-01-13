"""
Simple HTTP Server for the Makeup Artist Website
This serves the HTML files with proper MIME types and directory structure
"""

import http.server
import socketserver
import os

# Get the directory where this script is located (PYTHON folder)
script_dir = os.path.dirname(os.path.abspath(__file__))
# Get the parent directory (MARKUP folder)
parent_dir = os.path.dirname(script_dir)

# Change to the parent directory (MARKUP)
os.chdir(parent_dir)

print(f"Serving files from: {os.getcwd()}")

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Redirect root to INDEX.HTML
        if self.path == '/' or self.path == '':
            self.path = '/INDEX.HTML'
        return super().do_GET()

Handler = MyHTTPRequestHandler

print("=" * 60)
print("Makeup Artist Website - Frontend Server")
print("=" * 60)
print(f"Server starting on http://localhost:{PORT}")
print(f"Open your browser and go to: http://localhost:{PORT}")
print("=" * 60)
print("\nPress CTRL+C to stop the server")
print()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServer stopped.")
