#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        string s;
        cin >> s;

        int sleep = 0;
        int R = 0; // furthest index (1-based) up to which we must stay awake

        for (int i = 1; i <= n; ++i) {
            char c = s[i - 1];

            if (c == '1') {
                // Important class: must be awake here, and extend forced-awake window
                R = max(R, i + k);
            } else {
                // c == '0'
                if (i > R) {
                    // Not forced to stay awake -> can sleep
                    sleep++;
                }
                // else i <= R: forced awake, do nothing
            }
        }

        cout << sleep << "\n";
    }

    return 0;
}
