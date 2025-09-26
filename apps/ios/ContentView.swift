import SwiftUI

struct ContentView: View {
    @State private var counter = 0
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Header
                VStack(spacing: 8) {
                    Image(systemName: "lab.flask")
                        .font(.system(size: 60))
                        .foregroundColor(.blue)
                    
                    Text("The Lab")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                    
                    Text("Multi-Platform Development Boilerplate")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                // Interactive Demo
                VStack(spacing: 16) {
                    Text("Counter Demo")
                        .font(.headline)
                    
                    Text("\(counter)")
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(.blue)
                    
                    HStack(spacing: 20) {
                        Button("Decrement") {
                            counter -= 1
                        }
                        .buttonStyle(.bordered)
                        
                        Button("Increment") {
                            counter += 1
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    
                    Button("Reset") {
                        counter = 0
                    }
                    .buttonStyle(.borderless)
                }
                
                Spacer()
                
                // Features List
                VStack(alignment: .leading, spacing: 8) {
                    Text("Features")
                        .font(.headline)
                    
                    FeatureRow(icon: "globe", title: "Web App", description: "Next.js + React")
                    FeatureRow(icon: "iphone", title: "iOS App", description: "SwiftUI")
                    FeatureRow(icon: "iphone", title: "Android App", description: "React Native")
                    FeatureRow(icon: "paintbrush", title: "UI Components", description: "shadcn/ui + Tailwind")
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
            }
            .padding()
            .navigationTitle("The Lab")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(.blue)
                .frame(width: 20)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .fontWeight(.medium)
                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
    }
}

#Preview {
    ContentView()
}

